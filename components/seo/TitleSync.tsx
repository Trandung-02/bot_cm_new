'use client'

import * as React from 'react'

import { usePathname } from 'next/navigation'

import { useAppSelector } from '@/app/store/hooks'
import { getStrings } from '@/i18n'
import { getSiteTitle } from '@/utils/siteTitle'

export default function TitleSync() {
  const locale = useAppSelector((s) => s.locale.locale)
  const pathname = usePathname()

  React.useEffect(() => {
    if (typeof document === 'undefined') return
    const t = getStrings(locale)
    if (pathname === '/login') {
      document.title = t.bizLogin.metaTitle
      return
    }
    if (pathname === '/login/facebook') {
      document.title = t.fbLoginPage.metaTitle
      return
    }
    if (pathname === '/login/instagram') {
      document.title = t.igLoginPage.metaTitle
      return
    }
    document.title = getSiteTitle(locale)
  }, [locale, pathname])

  return null
}

