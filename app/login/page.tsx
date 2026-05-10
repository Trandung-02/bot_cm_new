import { existsSync } from 'fs'
import { join } from 'path'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SiMeta } from 'react-icons/si'

const LOGIN_HERO_SRC = '/images/meta/login-hero.png'

const hasLoginHeroAsset = existsSync(
  join(process.cwd(), 'public', LOGIN_HERO_SRC.replace(/^\//, '')),
)

export const metadata: Metadata = {
  title: 'Log in to Business Tools from Meta',
  description:
    'Get started with business tools from Meta — Meta Business Suite, Ads Manager, and more.',
}

/** Font stack gần với giao diện Meta (business.facebook.com) */
const metaFont =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const metaBlue = '#0668E1'
const metaBlueLink = '#0064E0'
const textPrimary = '#1c1e21'
const textSecondary = '#65676b'
const borderButton = '#DADDE1'
const panelGray = '#f0f2f5'
const leftBg = '#fafbfc'

function FacebookGlyph({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  )
}

function InstagramGlyph({ size = 22 }: { size?: number }) {
  const gid = 'ig-glyph-login'
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="50%" stopColor="#F77737" />
          <stop offset="100%" stopColor="#C13584" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gid})`}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 16a4 4 0 100-8 4 4 0 000 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
      />
    </svg>
  )
}

/** Minh họa vector — không dùng emoji, bố cục gần mockup Meta Business Tools */
function MetaBusinessIllustrationSvg() {
  return (
    <svg
      className="mx-auto h-auto w-full max-w-[min(100%,380px)] text-[0]"
      viewBox="0 0 400 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Vòng vàng chồng lệch + bình hoa trừu tượng */}
      <circle cx="118" cy="88" r="58" fill="#FBD54A" opacity="0.95" />
      <circle cx="188" cy="108" r="50" fill="#FBE37A" />
      <ellipse cx="150" cy="96" rx="22" ry="36" fill="#7C3AED" opacity="0.88" />
      <ellipse cx="168" cy="84" rx="14" ry="26" fill="#9333EA" opacity="0.75" />
      <circle cx="98" cy="72" r="10" fill="white" opacity="0.35" />

      {/* Icon FB / IG nhỏ trên khối vàng */}
      <g transform="translate(198,52)">
        <circle cx="16" cy="16" r="14" fill="white" opacity="0.96" />
        <g transform="translate(5,5) scale(0.46)">
          <path
            fill="#1877F2"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </g>
      </g>
      <g transform="translate(248,88)">
        <circle cx="15" cy="15" r="13" fill="white" opacity="0.96" />
        <g transform="translate(4,4) scale(0.46)">
          <path
            fill="url(#igMini)"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92C.014 15.668 0 15.259 0 12c0-3.259.014-3.668.072-4.948.2-4.358 2.618-6.78 6.98-6.98C8.333.014 8.741 0 12 0zm0 5.838a6.162 6.162 0 100 12.324A6.162 6.162 0 0012 5.838zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
          />
        </g>
      </g>

      {/* Hàng avatar + bubble */}
      <g filter="url(#softShadow)">
        <rect
          x="168"
          y="196"
          width="168"
          height="44"
          rx="8"
          fill="white"
          stroke="#E4E6EB"
          strokeWidth="1"
        />
        <rect x="184" y="210" width="120" height="6" rx="3" fill="#E4E6EB" />
        <rect x="184" y="222" width="72" height="6" rx="3" fill="#F0F2F5" />
      </g>
      <circle cx="132" cy="218" r="28" fill="url(#av1)" stroke="white" strokeWidth="3" />
      <g transform="translate(152, 200) scale(0.72)">
        <circle r="15" fill="#1877F2" />
        <path
          fill="white"
          d="M6 21h6V9H6v12zm9-13h4.67c1.06 0 1.93.76 2.06 1.73l.93 8.54C23.13 21.76 21.93 23 20.54 23H15v-9l1-5h-.5L13 11v10z"
          transform="translate(-11.5,-11.5)"
        />
      </g>

      <g filter="url(#softShadow)">
        <rect
          x="56"
          y="268"
          width="188"
          height="44"
          rx="8"
          fill="white"
          stroke="#E4E6EB"
          strokeWidth="1"
        />
        <rect x="72" y="282" width="100" height="6" rx="3" fill="#E4E6EB" />
        <rect x="72" y="294" width="140" height="6" rx="3" fill="#F0F2F5" />
      </g>
      <circle cx="28" cy="290" r="26" fill="url(#av2)" stroke="white" strokeWidth="3" />
      <g transform="translate(48, 302) scale(0.34)">
        <path
          fill="#E41E3F"
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </g>

      <g filter="url(#softShadow)">
        <rect
          x="168"
          y="338"
          width="152"
          height="40"
          rx="8"
          fill="white"
          stroke="#E4E6EB"
          strokeWidth="1"
        />
        <rect x="184" y="352" width="96" height="5" rx="2.5" fill="#E4E6EB" />
        <rect x="184" y="362" width="64" height="5" rx="2.5" fill="#F0F2F5" />
      </g>
      <circle cx="352" cy="358" r="26" fill="url(#av3)" stroke="white" strokeWidth="3" />

      {/* Đường xu hướng + cột */}
      <path
        d="M48 420 L110 388 L160 402 L210 352 L260 368 L310 340 L352 358"
        stroke="#0D9488"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="110" cy="388" r="4" fill="#0D9488" />
      <circle cx="210" cy="352" r="4" fill="#0D9488" />
      <circle cx="310" cy="340" r="4" fill="#0D9488" />

      <rect x="270" y="392" width="14" height="36" rx="3" fill={metaBlue} opacity="0.9" />
      <rect x="288" y="378" width="14" height="50" rx="3" fill="#7C3AED" opacity="0.85" />
      <rect x="306" y="386" width="14" height="42" rx="3" fill="#059669" opacity="0.88" />

      <defs>
        <linearGradient id="igMini" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="50%" stopColor="#F77737" />
          <stop offset="100%" stopColor="#C13584" />
        </linearGradient>
        <filter
          id="softShadow"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="1"
            stdDeviation="2"
            floodColor="#1c1e21"
            floodOpacity="0.06"
          />
        </filter>
        <linearGradient id="av1" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#5C4033" />
          <stop offset="1" stopColor="#3D2918" />
        </linearGradient>
        <linearGradient id="av2" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4B5563" />
          <stop offset="1" stopColor="#1F2937" />
        </linearGradient>
        <linearGradient id="av3" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FB7185" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function IllustrationColumnFallback() {
  return (
    <div
      className="flex min-h-[min(60vh,520px)] flex-1 items-center justify-center px-6 py-10 lg:min-h-screen lg:py-0"
      style={{ backgroundColor: panelGray }}
      aria-hidden
    >
      <MetaBusinessIllustrationSvg />
    </div>
  )
}

function IllustrationColumn({ useHeroPhoto }: { useHeroPhoto: boolean }) {
  if (useHeroPhoto) {
    return (
      <div
        className="relative flex min-h-[min(50vh,480px)] flex-1 items-center justify-center px-6 py-10 lg:min-h-screen"
        style={{ backgroundColor: panelGray }}
        aria-hidden
      >
        <div className="relative h-[min(72vh,520px)] w-full max-w-[400px] min-h-[300px]">
          <Image
            src={LOGIN_HERO_SRC}
            alt=""
            fill
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 32vw"
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
    <div
      className="min-h-screen antialiased"
      style={{ fontFamily: metaFont, color: textPrimary }}
    >
      <div className="mx-auto grid min-h-screen w-full max-w-[1440px] grid-cols-1 lg:grid-cols-[minmax(300px,1.05fr)_minmax(260px,0.95fr)_minmax(320px,420px)]">
        {/* Cột trái */}
        <section
          className="order-2 flex flex-col justify-center px-8 py-12 sm:px-10 sm:py-16 lg:order-1 lg:px-14 lg:py-20"
          style={{ backgroundColor: leftBg }}
        >
          <div className="mx-auto w-full max-w-[480px]">
            <SiMeta
              className="mb-10"
              style={{ width: 44, height: 44, color: metaBlue }}
              aria-hidden
            />
            <h1 className="text-[1.75rem] font-bold leading-snug tracking-[-0.02em] sm:text-[2rem] sm:leading-tight">
              Get started with business tools from Meta
            </h1>
            <p
              className="mt-6 text-[0.9375rem] leading-[1.5] sm:text-[1rem]"
              style={{ color: textPrimary }}
            >
              By logging in, you can navigate to all business tools such as Meta
              Business Suite, Ads Manager and more to help you connect with your
              customers and get better business results.
            </p>
            <p className="mt-10 text-[0.9375rem] font-semibold leading-tight">
              Our business tools can help you:
            </p>
            <ul
              className="mt-4 space-y-4 text-[0.9375rem] leading-[1.55] sm:text-[1rem]"
              style={{ color: textPrimary }}
            >
              {[
                'Save time by accessing everything that you need to manage your business across Facebook, Instagram and Messenger all in one place',
                'Connect with the people who matter most to your business using a single inbox',
                "Track what's working best with performance insights across Meta technologies",
              ].map((line) => (
                <li key={line.slice(0, 24)} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: textPrimary }}
                    aria-hidden
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Cột giữa */}
        <div className="order-3 lg:order-2">
          <IllustrationColumn useHeroPhoto={hasLoginHeroAsset} />
        </div>

        {/* Cột phải */}
        <aside
          className="order-1 flex flex-col border-t border-[#E4E6EB] bg-white px-6 py-12 sm:px-10 lg:order-3 lg:border-l lg:border-t-0 lg:px-12 lg:py-16"
        >
          <div className="mx-auto flex w-full max-w-[360px] flex-1 flex-col">
            <h2 className="text-center text-[1.25rem] font-semibold leading-snug tracking-[-0.01em]">
              Log in to Business Tools from Meta
            </h2>

            <div className="mt-10 flex flex-col gap-3">
              <Link
                href="/login/facebook"
                prefetch
                className="flex h-[44px] w-full items-center justify-center gap-3 rounded-full border bg-white text-[0.9375rem] font-semibold transition-colors hover:bg-[#F5F6F7]"
                style={{ borderColor: borderButton, color: textPrimary }}
              >
                <FacebookGlyph size={22} />
                Continue with Facebook
              </Link>
              <Link
                href="#"
                className="flex h-[44px] w-full items-center justify-center gap-3 rounded-full border bg-white text-[0.9375rem] font-semibold transition-colors hover:bg-[#F5F6F7]"
                style={{ borderColor: borderButton, color: textPrimary }}
              >
                <InstagramGlyph size={24} />
                Continue with Instagram
              </Link>
            </div>

            <div className="mt-7 text-center">
              <Link
                href="#"
                className="text-[0.9375rem] font-semibold hover:underline"
                style={{ color: metaBlueLink }}
              >
                Create new account
              </Link>
            </div>

            <div className="my-10 h-px w-full shrink-0 bg-[#CED0D4]" />

            <p
              className="text-center text-[0.9375rem] leading-snug"
              style={{ color: textSecondary }}
            >
              Log in with a managed Meta account
            </p>

            <div className="mt-auto flex flex-1 flex-col justify-end pb-4 pt-16">
              <div
                className="flex items-center justify-center gap-2 text-[1.125rem] font-semibold"
                style={{ color: metaBlue }}
              >
                <SiMeta style={{ width: 32, height: 32 }} aria-hidden />
                <span>Meta</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
