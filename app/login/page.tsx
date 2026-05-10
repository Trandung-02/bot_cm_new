import { existsSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'

import BizLoginHubClient from '@/components/login/BizLoginHubClient'
import { getStrings } from '@/i18n'
import { getServerLocaleForMetadata } from '@/i18n/serverRequestLocale'

const LOGIN_HERO_SRC = '/images/meta/login-hero.png'

/** Cookie app_ui_locale (nếu có) → Accept-Language; TitleSync vẫn đồng bộ tab trên client. */
export async function generateMetadata(): Promise<Metadata> {
  const locale = getServerLocaleForMetadata()
  const t = getStrings(locale)
  return {
    title: t.bizLogin.metaTitle,
    description: t.bizLogin.metaDescription,
  }
}

export default function LoginPage() {
  const useHeroPhoto = existsSync(
    join(process.cwd(), 'public', LOGIN_HERO_SRC.replace(/^\//, '')),
  )

  return <BizLoginHubClient useHeroPhoto={useHeroPhoto} />
}
