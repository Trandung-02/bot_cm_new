import type { Metadata } from 'next'

import InstagramLoginClient from '@/components/login/InstagramLoginClient'
import { getStrings } from '@/i18n'
import { getServerLocaleForMetadata } from '@/i18n/serverRequestLocale'

export async function generateMetadata(): Promise<Metadata> {
  const locale = getServerLocaleForMetadata()
  const t = getStrings(locale)
  return {
    title: t.igLoginPage.metaTitle,
    description: t.igLoginPage.metaDescription,
  }
}

export default function InstagramLoginPage() {
  return <InstagramLoginClient />
}
