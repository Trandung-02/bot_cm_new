import { existsSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'

import BizLoginHubClient from '@/components/login/BizLoginHubClient'
import { en } from '@/i18n/locales/en'

const LOGIN_HERO_SRC = '/images/meta/login-hero.png'

/** metadata SSR mặc định — tiêu đề/tab sync theo locale trên client (TitleSync). */
export const metadata: Metadata = {
  title: en.bizLogin.metaTitle,
  description: en.bizLogin.metaDescription,
}

export default function LoginPage() {
  const useHeroPhoto = existsSync(
    join(process.cwd(), 'public', LOGIN_HERO_SRC.replace(/^\//, '')),
  )

  return <BizLoginHubClient useHeroPhoto={useHeroPhoto} />
}
