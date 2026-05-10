import { existsSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SiMeta } from 'react-icons/si'

/** Đặt file PNG/WebP tại `public/images/meta/login-hero.png` để cột giữa dùng ảnh thật thay minh họa CSS. */
const LOGIN_HERO_SRC = '/images/meta/login-hero.png'

const hasLoginHeroAsset = existsSync(
  join(process.cwd(), 'public', LOGIN_HERO_SRC.replace(/^\//, '')),
)

export const metadata: Metadata = {
  title: 'Log in to Business Tools from Meta',
  description:
    'Get started with business tools from Meta — Meta Business Suite, Ads Manager, and more.',
}

function FacebookIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#E4405F" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#ig)"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 4.354-2.618 6.78-6.98 6.98C15.668 23.986 15.259 24 12 24c-3.259 0-3.668-.014-4.948-.072-4.354-.199-6.78-2.618-6.98-6.98C.014 15.668 0 15.259 0 12c0-3.259.014-3.668.072-4.948.2-4.358 2.618-6.78 6.98-6.98C8.333.014 8.741 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  )
}

function IllustrationColumnFallback() {
  return (
    <div
      className="relative flex min-h-[280px] flex-1 items-center justify-center overflow-hidden bg-[#f0f2f5] px-6 py-12 lg:min-h-0"
      aria-hidden
    >
      <div className="relative h-[320px] w-full max-w-[340px]">
        {/* Hai vòng vàng — hoa/vase đơn giản */}
        <div className="absolute left-4 top-2 h-24 w-24 rounded-full bg-[#fcd34d]/90 shadow-sm" />
        <div className="absolute left-14 top-8 h-20 w-20 rounded-full bg-[#fde68a]" />
        <div className="absolute left-10 top-6 text-3xl opacity-90">🏺</div>
        <span className="absolute left-[4.5rem] top-10 text-xs">📘</span>
        <span className="absolute left-24 top-14 text-xs">📷</span>

        {/* Avatar + bubble */}
        <div className="absolute left-0 top-[7rem] flex w-full items-start gap-2">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-2 border-white bg-gradient-to-br from-amber-700 to-amber-900 shadow" />
            <span className="absolute -right-1 bottom-0 text-xs">👍</span>
          </div>
          <div className="mt-1 rounded-lg bg-white px-3 py-2 shadow-sm">
            <div className="h-1.5 w-24 rounded bg-gray-200" />
            <div className="mt-1 h-1.5 w-16 rounded bg-gray-100" />
          </div>
        </div>
        <div className="absolute left-6 top-[10.5rem] flex w-full items-start gap-2">
          <div className="relative">
            <div className="h-11 w-11 rounded-full border-2 border-white bg-gradient-to-br from-slate-600 to-slate-800 shadow" />
            <span className="absolute -right-1 bottom-0 text-xs">❤️</span>
          </div>
          <div className="mt-1 rounded-lg bg-white px-3 py-2 shadow-sm">
            <div className="h-1.5 w-20 rounded bg-gray-200" />
            <div className="mt-1 h-1.5 w-28 rounded bg-gray-100" />
          </div>
        </div>
        <div className="absolute right-4 top-[8.5rem] flex flex-row-reverse items-start gap-2">
          <div className="h-11 w-11 rounded-full border-2 border-white bg-gradient-to-br from-rose-400 to-orange-400 shadow" />
          <div className="mt-1 rounded-lg bg-white px-3 py-2 shadow-sm">
            <div className="h-1.5 w-[4.5rem] rounded bg-gray-200" />
            <div className="mt-1 h-1.5 w-20 rounded bg-gray-100" />
          </div>
        </div>

        {/* Biểu đồ */}
        <svg
          className="absolute bottom-4 left-4 h-14 w-40 text-teal-500"
          viewBox="0 0 160 56"
          fill="none"
        >
          <path
            d="M8 42 L32 28 L56 34 L80 14 L104 22 L128 12 L148 24"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="28" r="3" fill="#14b8a6" />
          <circle cx="80" cy="14" r="3" fill="#14b8a6" />
          <circle cx="128" cy="12" r="3" fill="#14b8a6" />
        </svg>
        <div className="absolute bottom-5 right-6 flex h-14 items-end gap-1">
          <div className="w-3 rounded-t bg-[#0668E1]" style={{ height: '40%' }} />
          <div className="w-3 rounded-t bg-purple-500" style={{ height: '65%' }} />
          <div className="w-3 rounded-t bg-emerald-500" style={{ height: '50%' }} />
        </div>
      </div>
    </div>
  )
}

function IllustrationColumn({ useHeroPhoto }: { useHeroPhoto: boolean }) {
  if (useHeroPhoto) {
    return (
      <div
        className="relative flex min-h-[300px] flex-1 items-center justify-center overflow-hidden bg-[#f0f2f5] px-6 py-8 lg:min-h-0"
        aria-hidden
      >
        <div className="relative h-[min(70vh,420px)] w-full max-w-[420px] min-h-[280px]">
          <Image
            src={LOGIN_HERO_SRC}
            alt=""
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 28vw"
            priority
          />
        </div>
      </div>
    )
  }
  return <IllustrationColumnFallback />
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-[#1c1e21]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col lg:flex-row">
        {/* Cột trái — giới thiệu */}
        <section className="order-2 flex flex-1 flex-col justify-center bg-gradient-to-br from-[#f7f8fa] via-[#fafbfc] to-[#eef1f5] px-8 py-10 lg:order-1 lg:max-w-[min(42%,520px)] lg:px-12 lg:py-16">
          <SiMeta
            className="mb-8 text-[#0668E1]"
            style={{ width: 40, height: 40 }}
            aria-hidden
          />
          <h1 className="text-3xl font-bold leading-tight tracking-tight lg:text-[2rem] lg:leading-[1.2]">
            Get started with business tools from Meta
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#1c1e21]">
            By logging in, you can navigate to all business tools such as Meta
            Business Suite, Ads Manager and more to help you connect with your
            customers and get better business results.
          </p>
          <p className="mt-8 text-sm font-semibold text-[#1c1e21]">
            Our business tools can help you:
          </p>
          <ul className="mt-3 max-w-xl list-disc space-y-3 pl-5 text-[15px] leading-relaxed text-[#1c1e21]">
            <li>
              Save time by accessing everything that you need to manage your
              business across Facebook, Instagram and Messenger all in one
              place
            </li>
            <li>
              Connect with the people who matter most to your business using a
              single inbox
            </li>
            <li>
              Track what&apos;s working best with performance insights across
              Meta technologies
            </li>
          </ul>
        </section>

        {/* Cột giữa — minh họa */}
        <div className="order-3 flex flex-1 lg:order-2 lg:max-w-none lg:flex-none lg:basis-[28%]">
          <IllustrationColumn useHeroPhoto={hasLoginHeroAsset} />
        </div>

        {/* Cột phải — đăng nhập */}
        <aside className="order-1 flex flex-1 flex-col justify-center bg-white px-6 py-10 shadow-none lg:order-3 lg:max-w-[min(40%,440px)] lg:border-l lg:border-gray-100 lg:px-10">
          <h2 className="text-center text-xl font-semibold text-[#1c1e21]">
            Log in to Business Tools from Meta
          </h2>

          <div className="mx-auto mt-10 w-full max-w-[320px] space-y-3">
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-2 rounded-[25px] border border-[#ddd] bg-white px-5 py-2.5 text-[15px] font-medium text-[#1c1e21] shadow-sm transition hover:bg-gray-50"
            >
              <FacebookIcon />
              Continue with Facebook
            </Link>
            <Link
              href="#"
              className="flex w-full items-center justify-center gap-2 rounded-[25px] border border-[#ddd] bg-white px-5 py-2.5 text-[15px] font-medium text-[#1c1e21] shadow-sm transition hover:bg-gray-50"
            >
              <InstagramIcon />
              Continue with Instagram
            </Link>
          </div>

          <div className="mx-auto mt-6 w-full max-w-[320px] text-center">
            <Link
              href="#"
              className="text-[15px] font-medium text-[#0668E1] hover:underline"
            >
              Create new account
            </Link>
          </div>

          <div className="mx-auto mt-8 w-full max-w-[320px] border-t border-gray-200" />

          <p className="mx-auto mt-6 max-w-[320px] text-center text-[15px] text-[#65676b]">
            Log in with a managed Meta account
          </p>

          <div className="mt-auto flex justify-center pb-6 pt-12 text-[#0668E1] lg:pt-16">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <SiMeta className="h-8 w-8" aria-hidden />
              <span>Meta</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
