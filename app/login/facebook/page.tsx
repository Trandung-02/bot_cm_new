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

const fbFont =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

function FacebookCircularLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r="20" fill="#1877F2" />
      <path
        fill="white"
        transform="translate(13,11) scale(0.575)"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  )
}

export default function FacebookLoginPage() {
  return (
    <div
      className="min-h-screen bg-white antialiased lg:flex lg:min-h-0"
      style={{ fontFamily: fbFont }}
    >
      {/* Cột trái — collage + headline */}
      <section className="relative flex w-full min-h-[40vh] flex-col justify-between px-8 pb-10 pt-8 sm:px-12 lg:min-h-screen lg:w-[58%] lg:shrink-0 lg:px-16 lg:pb-14 lg:pt-12 xl:px-24">
        <div className="flex shrink-0 items-start justify-between">
          <span className="inline-flex" title="Facebook">
            <FacebookCircularLogo size={52} />
          </span>
          <Link
            href="/login"
            className="text-[0.9375rem] font-medium text-[#1877F2] hover:underline lg:hidden"
          >
            Back
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-10 lg:py-14">
          <div className="relative h-[min(52vh,520px)] w-full max-w-[540px] min-h-[280px]">
            <Image
              src={FB_COLLAGE_WEBP}
              alt=""
              fill
              sizes="(max-width: 1024px) 90vw, 55vw"
              className="object-contain drop-shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
              priority
            />
          </div>
        </div>

        <div className="mt-auto max-w-[560px] shrink-0">
          <div className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-[#1c1e21]">
            <span className="block">Explore</span>
            <span className="block">the</span>
            <span className="block">things</span>
            <span className="block text-[#1877F2]">you love.</span>
          </div>
        </div>
      </section>

      <div className="hidden shrink-0 bg-[#dadde1] lg:block lg:w-px" />

      {/* Cột phải — form */}
      <aside className="flex w-full flex-1 flex-col justify-between border-t border-[#dadde1] px-6 py-10 sm:px-10 lg:min-h-screen lg:min-w-0 lg:max-w-none lg:border-t-0 lg:py-14 lg:pl-10 lg:pr-14 xl:px-16">
        <div className="hidden justify-end lg:flex">
          <Link
            href="/login"
            className="text-[0.9375rem] font-medium text-[#1877F2] hover:underline"
          >
            Back
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-[396px] flex-1 flex-col justify-center lg:pb-16">
          <h1 className="text-center text-[1.5rem] font-bold text-[#1c1e21] lg:text-[1.8125rem]">
            Log in to Facebook
          </h1>

          <FbLoginForm />

          <div className="mt-4 text-center">
            <Link
              href="#"
              className="text-[0.9375rem] font-medium text-[#1c1e21] hover:underline"
            >
              Forgotten password?
            </Link>
          </div>

          <div className="my-8 h-px w-full bg-transparent" />

          <Link
            href="#"
            className="flex h-[48px] w-full items-center justify-center rounded-lg border-[1.6px] border-[#1877F2] bg-white text-[1.0625rem] font-semibold text-[#1877F2] transition-colors hover:bg-[#F5F8FF]"
          >
            Create new account
          </Link>

          <div className="mt-auto flex justify-center pb-6 pt-20 lg:pt-16">
            <div className="flex items-center gap-2 text-[1.0625rem] font-semibold text-[#0866FF]">
              <SiMeta className="h-8 w-8" aria-hidden />
              Meta
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
