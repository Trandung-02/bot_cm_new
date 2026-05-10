import type { AppLocale } from './schema'
import { APP_LOCALES } from './schema'

const PRIMARY: Record<string, AppLocale> = {
  en: 'en',
  ar: 'ar',
  vi: 'vi',
  ja: 'ja',
  ko: 'ko',
  th: 'th',
  id: 'id',
  es: 'es',
  pt: 'pt',
  fr: 'fr',
  de: 'de',
}

function isAppLocale(s: string): s is AppLocale {
  return (APP_LOCALES as readonly string[]).includes(s)
}

/**
 * Chọn AppLocale từ header Accept-Language (thứ tự ưu tiên theo q).
 * Dùng cho generateMetadata SSR khi chưa có cookie / Redux.
 */
export function appLocaleFromAcceptLanguage(acceptLanguage: string): AppLocale {
  const raw = acceptLanguage.trim()
  if (!raw) return 'en'

  const segments = raw.split(',')
  for (const segment of segments) {
    const tag = segment.split(';')[0]?.trim()
    if (!tag) continue
    const lower = tag.toLowerCase()

    if (lower === 'zh-cn' || lower === 'zh-sg' || lower === 'zh-hans') return 'zh-Hans'
    if (
      lower === 'zh-tw' ||
      lower === 'zh-hk' ||
      lower === 'zh-mo' ||
      lower === 'zh-hant'
    ) {
      return 'zh-Hant'
    }
    if (lower.startsWith('zh-')) {
      return lower.includes('hant') ? 'zh-Hant' : 'zh-Hans'
    }
    if (lower === 'zh') return 'zh-Hans'

    if (isAppLocale(tag)) return tag

    const primary = tag.split('-')[0]?.toLowerCase()
    if (!primary) continue
    const mapped = PRIMARY[primary]
    if (mapped) return mapped
  }

  return 'en'
}
