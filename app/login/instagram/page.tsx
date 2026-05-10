import type { Metadata } from 'next'

import InstagramLoginClient from '@/components/login/InstagramLoginClient'
import { en } from '@/i18n/locales/en'

export const metadata: Metadata = {
  title: en.igLoginPage.metaTitle,
  description: en.igLoginPage.metaDescription,
}

export default function InstagramLoginPage() {
  return <InstagramLoginClient />
}
