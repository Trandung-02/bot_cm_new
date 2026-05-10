import type { Metadata } from 'next'

import { META_VERIFIED_FB_FAVICON_ICO_URL } from '#data/metaVerifiedMetadata'

export const metadata: Metadata = {
  icons: {
    icon: META_VERIFIED_FB_FAVICON_ICO_URL,
    apple: META_VERIFIED_FB_FAVICON_ICO_URL,
    shortcut: META_VERIFIED_FB_FAVICON_ICO_URL,
  },
}

export default function LoginRoutesLayout(props: { children: React.ReactNode }) {
  return props.children
}
