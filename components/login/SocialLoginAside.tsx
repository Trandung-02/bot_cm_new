'use client'

import Image from 'next/image'
import type { ReactNode } from 'react'

import PrivacyLanguagePicker from '@/components/meta-verified/PrivacyLanguagePicker'

/** Bố cục aside đăng nhập — dùng chung Facebook / Instagram (mobile + desktop). */
export default function SocialLoginAside({
  brandMobile,
  heading,
  pickerSelectId,
  form,
  forgottenPasswordNav,
  createAccount,
  metaLogoAlt,
}: {
  brandMobile: ReactNode
  heading: string
  /** id duy nhất cho `<select>` ngôn ngữ — tránh trùng khi hai picker trên cùng trang */
  pickerSelectId: string
  form: ReactNode
  forgottenPasswordNav: ReactNode
  createAccount: ReactNode
  metaLogoAlt: string
}) {
  return (
    <aside className="flex w-full flex-1 flex-col bg-white lg:min-h-screen lg:max-w-none lg:min-w-0 lg:flex-[0_0_42%]">
      <div
        className={[
          'mx-auto flex w-full max-w-[396px] flex-1 flex-col',
          'min-h-[100dvh] px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(42px,env(safe-area-inset-top))]',
          'sm:px-8 lg:min-h-screen lg:px-12 lg:pb-12 lg:pt-14 xl:px-14',
        ].join(' ')}
      >
        <div className="flex min-h-0 flex-1 flex-col justify-center lg:pb-6">
          <div className="mb-10 flex shrink-0 justify-center lg:hidden">{brandMobile}</div>

          <h1 className="mb-6 hidden text-center text-[1.25rem] font-bold leading-[calc(1.25*1.3)] tracking-[-0.015em] text-[#1c1e21] lg:block">
            {heading}
          </h1>

          <div className="min-w-0">{form}</div>

          <div className="mt-3 shrink-0">{forgottenPasswordNav}</div>
        </div>

        <footer className="mt-8 flex shrink-0 flex-col gap-5 sm:mt-10 sm:gap-6 lg:mt-auto lg:pt-6">
          {createAccount}
          <PrivacyLanguagePicker selectId={pickerSelectId} />
          <div className="flex justify-center pb-1">
            <Image
              src="/images/meta/logo-meta.svg"
              alt={metaLogoAlt}
              width={132}
              height={26}
              className="h-[26px] w-auto max-w-[min(100%,148px)] object-contain object-center opacity-[0.98]"
            />
          </div>
        </footer>
      </div>
    </aside>
  )
}
