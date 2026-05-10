'use client'

import { useEffect, useId, useState } from 'react'

const LABEL_EMAIL_DESKTOP = 'Email address or mobile number'
const LABEL_EMAIL_MOBILE = 'Mobile number or email address'

const fieldBase =
  'peer box-border min-h-[54px] w-full appearance-none rounded-[10px] border border-[#dddfe2] bg-white px-[16px] pb-2 pt-[26px] text-[17px] leading-snug text-[#1c1e21] outline-none caret-[#1877F2] transition-[border-color,box-shadow] placeholder:text-transparent focus:border-[#1877F2] focus:shadow-[0_0_0_2px_rgba(24,119,242,0.25)] lg:min-h-[52px] lg:rounded-md lg:pt-[24px]'

const labelBase =
  'pointer-events-none absolute left-4 top-[26px] max-w-[calc(100%-2rem)] origin-[0] -translate-y-1/2 truncate text-[17px] text-[#606770] transition-[top,transform,font-size,color] duration-150 ease-out peer-focus:top-[11px] peer-focus:translate-y-0 peer-focus:text-[13px] peer-focus:leading-tight peer-[&:not(:placeholder-shown)]:top-[11px] peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[13px] peer-[&:not(:placeholder-shown)]:leading-tight'

export function FbLoginForm() {
  const emailId = useId()
  const passId = useId()
  const [emailLabel, setEmailLabel] = useState(LABEL_EMAIL_DESKTOP)

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
      className="mt-8 flex flex-col gap-3 sm:gap-3 lg:mt-6"
      noValidate
      method="POST"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className="relative">
        <input
          id={emailId}
          type="text"
          name="email"
          placeholder=" "
          autoComplete="username"
          aria-invalid={false}
          dir="ltr"
          className={fieldBase}
        />
        <label htmlFor={emailId} className={labelBase}>
          {emailLabel}
        </label>
      </div>

      <div className="relative">
        <input
          id={passId}
          type="password"
          name="pass"
          placeholder=" "
          autoComplete="current-password"
          aria-invalid={false}
          dir="ltr"
          className={fieldBase}
        />
        <label htmlFor={passId} className={labelBase}>
          Password
        </label>
      </div>

      <button
        type="submit"
        aria-label="Log in"
        className="mt-2 w-full rounded-full bg-[#1877F2] py-3 text-[1.0625rem] font-bold leading-tight tracking-wide text-white transition-colors hover:bg-[#166FE5] lg:mt-3 lg:rounded-md lg:py-[0.65rem] lg:text-[1.0625rem]"
      >
        Log in
      </button>
    </form>
  )
}
