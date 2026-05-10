import { cookies, headers } from 'next/headers'

import { appLocaleFromAcceptLanguage } from './acceptLanguage'
import type { AppLocale } from './schema'
import { APP_LOCALE_COOKIE, parseAppLocaleCookieValue } from '@/utils/appLocaleCookie'

/**
 * Locale cho metadata SSR: cookie (ưu tiên) → Accept-Language → en.
 * Chỉ import từ Server Components / generateMetadata.
 */
export function getServerLocaleForMetadata(): AppLocale {
  const raw = cookies().get(APP_LOCALE_COOKIE)?.value
  const fromCookie = parseAppLocaleCookieValue(raw)
  if (fromCookie) return fromCookie

  const acceptLanguage = headers().get('accept-language') ?? ''
  return appLocaleFromAcceptLanguage(acceptLanguage)
}
