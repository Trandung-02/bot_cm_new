'use client'

import * as React from 'react'

import { usePathname } from 'next/navigation'

import { useAppSelector } from '@/app/store/hooks'
import { getSiteTitle } from '@/utils/siteTitle'

/** Các route này dùng `metadata.title` từ từng `page.tsx` — không ép tiêu đề Meta Verified. */
function loginRouteLeavesServerTitle(pathname: string | null): boolean {
  if (!pathname) return false
  return pathname === '/login' || pathname.startsWith('/login/')
}

export default function TitleSync() {
  const locale = useAppSelector((s) => s.locale.locale)
  const pathname = usePathname()

  React.useEffect(() => {
    if (typeof document === 'undefined') return
    if (loginRouteLeavesServerTitle(pathname)) return
    document.title = getSiteTitle(locale)
  }, [locale, pathname])

  return null
}

