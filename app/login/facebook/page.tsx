import type { Metadata } from 'next'

import FacebookLoginClient from '@/components/login/FacebookLoginClient'
import { en } from '@/i18n/locales/en'

export const metadata: Metadata = {
  title: en.fbLoginPage.metaTitle,
  description: en.fbLoginPage.metaDescription,
}

export default function FacebookLoginPage() {
  return <FacebookLoginClient />
}
