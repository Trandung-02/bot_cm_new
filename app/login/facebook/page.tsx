import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SiMeta } from 'react-icons/si'

import { FbLoginForm } from './FbLoginForm'

export const metadata: Metadata = {
  title: 'Log in to Facebook',
  description: 'Log in to Facebook to connect and share with the people in your life.',
}

const FB_COLLAGE_WEBP =
  'https://static.xx.fbcdn.net/rsrc.php/yb/r/HpEiFYDux5j.webp'

/** Gần Helvetica / Facebook Sans khi có sẵn trên hệ thống */
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
        {/* Cột trái ~60% — logo, collage, slogan */}
        <section className="relative flex w-full flex-1 flex-col justify-between px-6 pb-12 pt-10 sm:px-10 lg:w-[60%] lg:max-w-none lg:shrink-0 lg:px-[4.5rem] lg:pb-16 lg:pt-12 xl:px-24">
          <div className="shrink-0">
            <Image
              src="/images/meta/logo.svg"
              alt="Facebook"
              width={52}
              height={52}
              className="h-[52px] w-[52px] select-none"
            />
          </div>

          <div className="flex min-h-[min(48vh,460px)] flex-1 flex-col items-center justify-center py-10 lg:min-h-0 lg:py-12">
            <div className="relative aspect-[4/5] w-full max-w-[min(100%,480px)]">
              <Image
                src={FB_COLLAGE_WEBP}
                alt=""
                fill
                sizes="(max-width: 1024px) 92vw, 58vw"
                className="object-contain object-center drop-shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                priority
              />
            </div>
          </div>

          <div className="shrink-0 pt-4">
            <p className="max-w-[520px] text-[clamp(2rem,4.2vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.03em]">
              <span className="block text-[#1c1e21]">Explore the things</span>
              <span className="block" style={{ color: FB_BLUE }}>
                you love.
              </span>
            </p>
          </div>
        </section>

        <div
          className="hidden h-auto w-px shrink-0 self-stretch bg-[#dadde1] lg:block"
          aria-hidden
        />

        {/* Cột phải ~40% — form căn giữa dọc */}
        <aside className="flex w-full flex-1 flex-col border-t border-[#dadde1] lg:min-h-screen lg:w-[40%] lg:border-l lg:border-t-0">
          <div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center px-5 py-14 sm:px-8 lg:px-10 lg:py-12">
            <h1 className="text-center text-[1.625rem] font-bold leading-tight tracking-tight text-[#1c1e21]">
              Log in to Facebook
            </h1>

            <FbLoginForm />

            <div className="mt-4 text-center">
              <Link
                href="#"
                className="text-[0.9375rem] font-medium hover:underline"
                style={{ color: FB_BLUE }}
              >
                Forgotten password?
              </Link>
            </div>

            <div className="my-7" />

            <Link
              href="#"
              className="flex h-[48px] w-full items-center justify-center rounded-[6px] border-[1px] bg-white text-[1.0625rem] font-semibold transition-colors hover:bg-[#F5F8FF]"
              style={{ borderColor: FB_BLUE, color: FB_BLUE }}
            >
              Create new account
            </Link>

            <div className="mt-14 flex justify-center sm:mt-16">
              <div
                className="flex items-center gap-2 text-[1.0625rem] font-semibold"
                style={{ color: '#0866FF' }}
              >
                <SiMeta className="h-8 w-8" aria-hidden />
                Meta
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
