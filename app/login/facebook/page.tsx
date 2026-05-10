import type { Metadata } from 'next'

import FacebookLoginClient from '@/components/login/FacebookLoginClient'
import { getStrings } from '@/i18n'
import { getServerLocaleForMetadata } from '@/i18n/serverRequestLocale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getServerLocaleForMetadata()
  const t = getStrings(locale)
  return {
    title: t.fbLoginPage.metaTitle,
    description: t.fbLoginPage.metaDescription,
  }
}

export default function FacebookLoginPage() {
  return <FacebookLoginClient />
}
