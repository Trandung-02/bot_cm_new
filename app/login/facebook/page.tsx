import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FbLoginForm } from './FbLoginForm'

export const metadata: Metadata = {
  title: 'Log in to Facebook',
  description: 'Log in to Facebook to connect and share with the people in your life.',
}

const FB_COLLAGE_WEBP =
  'https://static.xx.fbcdn.net/rsrc.php/yb/r/HpEiFYDux5j.webp'

/** Xanh Facebook (nút, viền, link chính) */
const FB_BLUE = '#1877F2'

const fbFont =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const TEXT_DARK = '#1c1e21'

export default function FacebookLoginPage() {
  return (
    <div
      className="min-h-screen bg-[#FFFFFF] antialiased [-webkit-font-smoothing:antialiased]"
      style={{ fontFamily: fbFont }}
    >
      <div className="mx-auto flex min-h-screen max-w-[1920px] flex-col lg:flex-row">
        {/* Trái ~60% — nền trắng tinh, collage + slogan */}
        <section className="relative flex w-full flex-[0_0_100%] flex-col justify-between bg-[#FFFFFF] px-7 pb-11 pt-11 sm:px-12 lg:flex-[0_0_58%] lg:max-w-none lg:px-16 lg:pb-[3.25rem] lg:pt-14 xl:pl-20 xl:pr-16">
          <div className="shrink-0">
            <Image
              src="/images/meta/logo.svg"
              alt="Facebook"
              width={48}
              height={48}
              className="size-12 select-none sm:size-[52px]"
            />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center py-8 lg:min-h-[320px] lg:py-10">
            <div className="relative aspect-[3/4] w-full max-w-[min(94vw,720px)] lg:max-h-[min(64vh,680px)] lg:max-w-[min(100%,640px)]">
              <Image
                src={FB_COLLAGE_WEBP}
                alt=""
                fill
                sizes="(max-width: 1024px) 94vw, min(640px, 58vw)"
                className="object-contain object-center"
                style={{
                  filter: 'drop-shadow(0 14px 42px rgba(0, 0, 0, 0.1))',
                }}
                priority
              />
            </div>
          </div>

          <div className="shrink-0 border-t border-transparent pt-1">
            <p className="max-w-[520px] text-left text-[clamp(1.875rem,4vw,3.125rem)] font-bold leading-[1.08] tracking-[-0.035em]">
              <span className="block" style={{ color: TEXT_DARK }}>
                Explore
              </span>
              <span className="block" style={{ color: TEXT_DARK }}>
                the
              </span>
              <span className="block" style={{ color: TEXT_DARK }}>
                things
              </span>
              <span className="block">
                <span style={{ color: FB_BLUE }}>you love</span>
                <span style={{ color: TEXT_DARK }}>.</span>
              </span>
            </p>
          </div>
        </section>

        <div
          className="hidden w-px shrink-0 self-stretch bg-[#dadde1] lg:block"
          aria-hidden
        />

        {/* Phải ~40% — nền trắng, form căn giữa */}
        <aside className="flex w-full flex-1 flex-col border-t bg-[#FFFFFF] lg:min-h-screen lg:flex-[0_0_42%] lg:max-w-none lg:border-l lg:border-t-0 lg:border-[#dde1e6]">
          <div className="mx-auto flex w-full max-w-[398px] flex-1 flex-col justify-center px-7 py-14 sm:px-8 lg:min-h-[min(100dvh,900px)] lg:px-12 lg:py-16">
            <h1
              className="text-center font-bold leading-tight tracking-[-0.02em]"
              style={{ color: TEXT_DARK, fontSize: '1.625rem' }}
            >
              Log in to Facebook
            </h1>

            <FbLoginForm />

            <nav className="mt-4 text-center" aria-label="Account help">
              <Link
                href="#"
                className="inline-block text-[15px] font-medium leading-snug hover:underline"
                style={{ color: FB_BLUE }}
              >
                Forgotten password?
              </Link>
            </nav>

            <div className="my-8 sm:my-10" aria-hidden />

            <Link
              href="#"
              className="flex h-12 w-full shrink-0 items-center justify-center rounded-md border border-solid bg-[#FFFFFF] text-[17px] font-semibold transition-colors hover:bg-[#F0F2F5]"
              style={{ borderColor: FB_BLUE, color: FB_BLUE }}
            >
              Create new account
            </Link>

            <div className="mt-14 flex justify-center sm:mt-16">
              <Image
                src="/images/meta/logo-meta.svg"
                alt="Meta"
                width={132}
                height={26}
                className="h-[26px] w-auto max-w-[min(100%,148px)] object-contain object-center"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
