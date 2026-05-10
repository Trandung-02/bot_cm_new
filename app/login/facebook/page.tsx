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

const fbFont =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const FB_BLUE = '#1877F2'

export default function FacebookLoginPage() {
  return (
    <div
      className="min-h-screen bg-white text-[#050505] antialiased [-webkit-font-smoothing:antialiased]"
      style={{ fontFamily: fbFont }}
    >
      <div className="mx-auto flex min-h-screen flex-col lg:flex-row">
        {/* Cột trái — logo, collage (lớn), slogan 4 dòng */}
        <section className="relative flex w-full flex-1 flex-col justify-between px-6 pb-12 pt-10 sm:px-10 lg:w-[60%] lg:shrink-0 lg:px-[4.5rem] lg:pb-16 lg:pt-12 xl:px-24">
          <div className="shrink-0">
            <Image
              src="/images/meta/logo.svg"
              alt="Facebook"
              width={52}
              height={52}
              className="h-[52px] w-[52px] select-none"
            />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center py-6 lg:min-h-0 lg:py-8">
            <div className="relative h-[min(58vh,640px)] w-full max-w-[min(100%,700px)] sm:h-[min(62vh,680px)] lg:max-w-[640px] xl:max-w-[700px]">
              <Image
                src={FB_COLLAGE_WEBP}
                alt=""
                fill
                sizes="(max-width: 1024px) 92vw, min(700px, 60vw)"
                className="object-contain object-center drop-shadow-[0_12px_40px_rgba(0,0,0,0.14)]"
                priority
              />
            </div>
          </div>

          <div className="shrink-0 pt-2">
            <p className="max-w-[560px] text-[clamp(2rem,4.2vw,3.35rem)] font-bold leading-[1.06] tracking-[-0.03em]">
              <span className="block text-[#1c1e21]">Explore</span>
              <span className="block text-[#1c1e21]">the</span>
              <span className="block text-[#1c1e21]">things</span>
              <span className="block">
                <span style={{ color: FB_BLUE }}>you love</span>
                <span className="text-[#1c1e21]">.</span>
              </span>
            </p>
          </div>
        </section>

        <div
          className="hidden h-auto w-px shrink-0 self-stretch bg-[#dadde1] lg:block"
          aria-hidden
        />

        {/* Cột phải — form, căn giữa, nhãn Meta từ SVG */}
        <aside className="flex w-full flex-1 flex-col border-t border-[#dadde1] lg:min-h-[100dvh] lg:w-[40%] lg:border-l lg:border-t-0">
          <div className="mx-auto flex w-full max-w-[396px] flex-1 flex-col justify-center px-6 py-12 sm:px-8 lg:min-h-0 lg:px-0 lg:py-14">
            <h1 className="text-center text-[1.5rem] font-bold leading-[1.22] tracking-[-0.02em] text-[#1c1e21] sm:text-[1.6875rem]">
              Log in to Facebook
            </h1>

            <FbLoginForm />

            <nav className="mt-4 text-center" aria-label="Account help">
              <Link
                href="#"
                className="inline-block text-[0.9375rem] font-medium leading-snug hover:underline"
                style={{ color: FB_BLUE }}
              >
                Forgotten password?
              </Link>
            </nav>

            <div className="my-9 min-h-[1px]" aria-hidden />

            <Link
              href="#"
              className="flex h-[48px] w-full shrink-0 items-center justify-center rounded-[6px] border border-solid bg-white text-[1.0625rem] font-semibold leading-none transition-colors hover:bg-[#F5F8FF]"
              style={{ borderColor: FB_BLUE, color: FB_BLUE }}
            >
              Create new account
            </Link>

            <div className="mt-12 flex justify-center sm:mt-14">
              <Image
                src="/images/meta/logo-meta.svg"
                alt="Meta"
                width={120}
                height={24}
                className="h-6 w-auto max-w-[min(100%,140px)] object-contain object-center"
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
