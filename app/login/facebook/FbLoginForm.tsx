'use client'

import { useEffect, useId, useState } from 'react'

const LABEL_EMAIL_DESKTOP = 'Email address or mobile number'
const LABEL_EMAIL_MOBILE = 'Mobile number or email address'

const FB_BLUE_LINK = '#1877F2'

const fieldBase =
  'peer box-border min-h-[52px] w-full appearance-none rounded-md border border-[#dddfe2] bg-white px-4 pb-2 pt-[22px] text-[17px] leading-[1.25] text-[#1c1e21] outline-none caret-[#1877F2] transition-[border-color,box-shadow] placeholder:text-transparent focus:border-[#1877F2] focus:shadow-[0_0_0_2px_rgba(24,119,242,0.25)] sm:min-h-[54px] sm:pt-[24px]'

const fieldErrorClasses =
  'border-[#FA383E] focus:border-[#FA383E] focus:shadow-[0_0_0_2px_rgba(250,56,62,0.28)]'

const labelBase =
  'pointer-events-none absolute left-4 top-[22px] max-w-[calc(100%-2rem)] origin-[0] -translate-y-1/2 truncate text-[17px] text-[#606770] transition-[top,transform,font-size,color] duration-150 ease-out peer-focus:top-[10px] peer-focus:translate-y-0 peer-focus:text-[13px] peer-focus:leading-tight peer-[&:not(:placeholder-shown)]:top-[10px] peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[13px] peer-[&:not(:placeholder-shown)]:leading-tight sm:top-[24px] sm:peer-focus:top-[11px] sm:peer-[&:not(:placeholder-shown)]:top-[11px]'

/** Khi ô đang `type="password"` — nút “Show password” (mắt + gạch, stroke cân với UI FB). */
function IconEyeSlash({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1 4.24-4.24" />
      <path d="M1 1l22 22" />
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

export function FbLoginForm() {
  const emailId = useId()
  const passId = useId()
  /** useId có thể chứa `:` — làm sạch để dùng trong id HTML */
  const emailErrorDescId = `fb-email-err-${useId().replace(/:/g, '')}`
  const [emailLabel, setEmailLabel] = useState(LABEL_EMAIL_DESKTOP)
  const [emailInvalid, setEmailInvalid] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const showPasswordToggle = password.length > 0

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

  return (
    <form
      id="login_form"
      className="mt-4 flex flex-col gap-3"
      noValidate
      method="POST"
      onSubmit={(e) => {
        e.preventDefault()
        const fd = new FormData(e.currentTarget)
        const raw = String(fd.get('email') ?? '').trim()
        if (!raw) {
          setEmailInvalid(true)
          return
        }
        setEmailInvalid(false)
      }}
    >
      <div className="flex flex-col gap-0">
        <div className="relative">
          <input
            id={emailId}
            type="text"
            name="email"
            placeholder=" "
            autoComplete="username webauthn"
            aria-invalid={emailInvalid}
            aria-describedby={emailInvalid ? emailErrorDescId : undefined}
            dir="ltr"
            onChange={() => setEmailInvalid(false)}
            className={`${fieldBase} ${emailInvalid ? fieldErrorClasses : ''}`}
          />
          <label
            htmlFor={emailId}
            className={`${labelBase} ${emailInvalid ? 'text-[#FA383E]' : ''}`}
          >
            {emailLabel}
          </label>
        </div>

        {emailInvalid ? (
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
                  href="https://facebook.com/login/identify/"
                  role="link"
                  tabIndex={0}
                  target="_self"
                  style={{ color: FB_BLUE_LINK }}
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
          aria-invalid={false}
          dir="ltr"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${fieldBase} ${showPasswordToggle ? 'pr-12 sm:pr-[2.875rem]' : ''}`}
        />
        <label
          htmlFor={passId}
          className={`${labelBase} ${showPasswordToggle ? 'max-w-[calc(100%-3rem)] sm:max-w-[calc(100%-3.25rem)]' : ''}`}
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

      <button
        type="submit"
        aria-label="Log in"
        className="mt-1 w-full rounded-md bg-[#1877F2] py-[0.65rem] text-[1.0625rem] font-bold leading-tight text-white transition-colors hover:bg-[#166FE5] active:bg-[#1565d8]"
      >
        Log in
      </button>
    </form>
  )
}
