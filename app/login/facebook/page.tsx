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
        {/* Desktop: trái ~58% — collage + slogan (+ logo đầu cột). Mobile: ẩn hoàn toàn */}
        <section className="relative hidden min-h-screen w-full min-w-0 flex-[0_0_100%] flex-col justify-between bg-[#FFFFFF] lg:flex lg:max-w-none lg:flex-[0_0_60%] lg:px-[4.5rem] lg:pb-12 lg:pt-12 xl:pl-24 xl:pr-20">
          <div className="shrink-0">
            <Image
              src="/images/meta/logo.svg"
              alt="Facebook"
              width={48}
              height={48}
              className="size-12 select-none sm:size-[52px]"
            />
          </div>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center py-6 lg:min-h-[280px] lg:py-8">
            <div className="relative aspect-[3/4] w-full max-w-[min(94vw,720px)] lg:max-h-[min(68vh,720px)] lg:max-w-[min(100%,700px)]">
              <Image
                src={FB_COLLAGE_WEBP}
                alt=""
                fill
                sizes="(max-width: 1024px) 94vw, min(700px, 60vw)"
                className="object-contain object-center"
                style={{
                  filter: 'drop-shadow(0 14px 42px rgba(0, 0, 0, 0.1))',
                }}
                priority
              />
            </div>
          </div>

          <div className="shrink-0 pt-2">
            <p className="max-w-[520px] text-left text-[clamp(1.875rem,3.2vw,3rem)] font-bold leading-[1.06] tracking-[-0.035em]">
              <span className="block" style={{ color: TEXT_DARK }}>
                Explore
              </span>
              <span className="block" style={{ color: TEXT_DARK }}>
                the
              </span>
              <span className="block" style={{ color: TEXT_DARK }}>
                things
              </span>
              <span className="block" style={{ color: FB_BLUE }}>
                you love.
              </span>
            </p>
          </div>
        </section>

        <div
          className="hidden w-px shrink-0 self-stretch bg-[#dadde1] lg:block"
          aria-hidden
        />

        {/* Mobile: một cột giống app FB (logo → form → quên MK → tạo TK → Meta). Desktop: form cạnh collage */}
        <aside className="flex w-full flex-1 flex-col bg-[#FFFFFF] lg:min-h-screen lg:max-w-none lg:min-w-0 lg:flex-[0_0_40%]">
          <div className="mx-auto flex w-full max-w-[396px] flex-1 flex-col px-7 pb-10 pt-10 sm:px-8 max-lg:min-h-[100dvh] max-lg:justify-between lg:min-h-screen lg:justify-between lg:px-14 lg:py-12">
            <div className="flex w-full flex-col items-stretch lg:flex-1 lg:justify-center lg:py-6">
              <div className="mb-7 flex justify-center lg:hidden">
                <Image
                  src="/images/meta/logo.svg"
                  alt="Facebook"
                  width={56}
                  height={56}
                  className="size-14 select-none"
                />
              </div>

              <h1
                className="hidden text-center font-bold leading-tight tracking-[-0.02em] lg:block lg:pb-0.5"
                style={{ color: TEXT_DARK, fontSize: '1.6875rem' }}
              >
                Log in to Facebook
              </h1>

              <FbLoginForm />

              <nav className="mt-3 text-center" aria-label="Account help">
                <Link
                  href="#"
                  className="inline-block text-[17px] font-normal leading-snug hover:underline lg:text-[15px]"
                  style={{ color: TEXT_DARK }}
                >
                  Forgotten password?
                </Link>
              </nav>
            </div>

            <div className="mt-8 flex w-full flex-col items-stretch max-lg:mt-0 lg:mt-0 lg:shrink-0 lg:pb-2">
              <Link
                href="#"
                className="flex h-12 w-full shrink-0 items-center justify-center rounded-full border border-solid bg-[#FFFFFF] text-[17px] font-semibold transition-colors hover:bg-[#F0F2F5] lg:h-11 lg:rounded-lg"
                style={{ borderColor: FB_BLUE, color: FB_BLUE }}
              >
                Create new account
              </Link>

              <div className="mt-8 flex justify-center pb-1 lg:mt-10">
                <Image
                  src="/images/meta/logo-meta.svg"
                  alt="Meta"
                  width={132}
                  height={26}
                  className="h-[26px] w-auto max-w-[min(100%,148px)] object-contain object-center"
                />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
