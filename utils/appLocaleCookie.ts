import { APP_LOCALES, type AppLocale } from '@/i18n/schema'

/** Cookie HTTP — đọc được từ generateMetadata; ghi từ client khi user đổi ngôn ngữ hoặc bootstrap. */
export const APP_LOCALE_COOKIE = 'app_ui_locale'

const ONE_YEAR_SEC = 60 * 60 * 24 * 365

function isAppLocale(raw: string): raw is AppLocale {
  return (APP_LOCALES as readonly string[]).includes(raw)
}

/** Chuẩn hóa giá trị cookie (đã decode sẵn bởi Next/cookie store). */
export function parseAppLocaleCookieValue(
  value: string | undefined,
): AppLocale | null {
  if (!value) return null
  return isAppLocale(value) ? value : null
}

/** Chỉ chạy trên browser — báo cho lần request SSR sau biết locale UI. */
export function writeAppLocaleCookie(locale: AppLocale) {
  if (typeof document === 'undefined') return
  const secure =
    typeof window !== 'undefined' && window.location.protocol === 'https:'
      ? '; Secure'
      : ''
  document.cookie = `${APP_LOCALE_COOKIE}=${encodeURIComponent(locale)}; Path=/; Max-Age=${ONE_YEAR_SEC}; SameSite=Lax${secure}`
}
