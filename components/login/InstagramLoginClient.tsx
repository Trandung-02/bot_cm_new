'use client'

import Image from 'next/image'
import Link from 'next/link'

import { FbLoginForm } from '@/app/login/facebook/FbLoginForm'
import SocialLoginAside from '@/components/login/SocialLoginAside'
import { useAppStrings } from '@/hooks/useAppStrings'

const IG_HERO_COLLAGE_WEBP =
  'https://static.cdninstagram.com/rsrc.php/yJ/r/53X3pk-t2Gn.webp'

const TEXT_DARK = '#1c1e21'

const uiFont =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Historic", "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const IG_ACCENT = '#E4405F'

const INSTAGRAM_MARK_SRC = '/images/meta/Instagram.svg'

export default function InstagramLoginClient() {
  const t = useAppStrings()
  const p = t.igLoginPage

  return (
    <div
      className="min-h-[100dvh] bg-white antialiased [-webkit-font-smoothing:antialiased]"
      style={{ fontFamily: uiFont, color: TEXT_DARK }}
    >
      <div className="mx-auto flex min-h-[100dvh] max-w-[1920px] flex-col lg:min-h-screen lg:flex-row">
        <section className="hidden min-h-screen w-full flex-col bg-white lg:flex lg:flex-[0_0_58%] lg:justify-between lg:px-[clamp(2.5rem,4vw,4.25rem)] lg:pb-[clamp(1.75rem,3vh,3rem)] lg:pt-[clamp(2rem,3.5vw,3rem)] xl:pl-[4.75rem] xl:pr-14">
          <header className="shrink-0">
            <span className="sr-only">{p.brandSrOnly}</span>
            <Image
              src={INSTAGRAM_MARK_SRC}
              alt=""
              width={132}
              height={132}
              className="inline-block size-[clamp(2.5rem,5.25vw,3.125rem)] translate-y-px select-none object-contain"
              priority
              aria-hidden
            />
          </header>

          <div className="relative flex min-h-0 w-full flex-1 flex-col justify-center pb-6 pt-4 lg:my-0 lg:px-0 lg:py-4">
            <div className="relative mx-auto h-[min(74vh,880px)] w-full max-w-[min(800px,calc(100%-1rem))] shrink-0 xl:max-w-[min(860px,95%)]">
              <Image
                src={IG_HERO_COLLAGE_WEBP}
                alt=""
                fill
                sizes="(max-width: 1024px) 92vw, min(860px, 60vw)"
                className="object-contain object-center"
                priority
              />
            </div>
          </div>

          <footer className="relative z-[1] shrink-0 pb-2 pt-8 lg:pb-2 lg:pt-10">
            <p
              className="text-left font-bold tracking-[-0.04em] text-[#1c1e21] lg:whitespace-normal"
              style={{
                fontSize: 'clamp(1.9375rem, 1vw + 1.45rem, 2.9375rem)',
                lineHeight: 1.1,
              }}
            >
              {p.sloganBefore}
              <span className="inline-block bg-clip-text bg-[linear-gradient(217deg,#FFDD55_0%,#FF543E_24%,#C837AB_48%,#5851DB_72%,#405DE6_100%)] text-transparent">
                {p.sloganHighlight}
              </span>
              <span className="text-[#1c1e21]">.</span>
            </p>
          </footer>
        </section>

        <div className="hidden w-px shrink-0 self-stretch bg-[#dadde1] lg:block" aria-hidden />

        <SocialLoginAside
          brandMobile={
            <Image
              src={INSTAGRAM_MARK_SRC}
              alt={p.brandSrOnly}
              width={132}
              height={132}
              className="size-[60px] select-none object-contain"
              priority
            />
          }
          heading={p.heading}
          pickerSelectId="login-aside-lang-instagram"
          form={<FbLoginForm variant="instagram" />}
          forgottenPasswordNav={
            <nav className="text-center" aria-label={p.accountHelpNav}>
              <Link
                href="https://www.instagram.com/accounts/password/reset/"
                className="inline-block text-[17px] font-normal leading-snug hover:underline max-lg:text-[#1c1e21] lg:text-[15px]"
                style={{ color: IG_ACCENT }}
              >
                {p.forgottenPassword}
              </Link>
            </nav>
          }
          createAccount={
            <Link
              href="https://www.instagram.com/accounts/emailsignup/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-full shrink-0 items-center justify-center rounded-[10px] border border-solid border-[#E4405F] bg-white text-[17px] font-semibold leading-tight text-[#E4405F] transition-colors hover:bg-[#F5F6F7] lg:rounded-md lg:border-0 lg:bg-[#E4405F] lg:text-white lg:hover:bg-[#d73363] lg:active:bg-[#c42d57]"
            >
              {p.createAccount}
            </Link>
          }
          metaLogoAlt={p.metaLogoAlt}
        />
      </div>
    </div>
  )
}
