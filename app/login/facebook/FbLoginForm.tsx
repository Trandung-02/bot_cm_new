'use client'

import { useEffect, useState } from 'react'

const PLACEHOLDER_MOBILE = 'Mobile number or email address'
const PLACEHOLDER_DESKTOP = 'Email address or mobile number'

export function FbLoginForm() {
  const [emailPlaceholder, setEmailPlaceholder] = useState(PLACEHOLDER_DESKTOP)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    const sync = () =>
      setEmailPlaceholder(mq.matches ? PLACEHOLDER_MOBILE : PLACEHOLDER_DESKTOP)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <form
      className="flex flex-col gap-3 lg:mt-5"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <input
        type="text"
        name="email"
        placeholder={emailPlaceholder}
        autoComplete="username"
        className="w-full rounded-[10px] border border-[#dddfe2] px-4 py-[14px] text-[17px] text-[#1c1e21] placeholder-[#96999e] outline-none ring-0 transition-shadow focus:border-[#1877F2] focus:shadow-[0_0_0_2px_rgba(24,119,242,0.25)] lg:rounded-[6px]"
      />
      <input
        type="password"
        name="pass"
        placeholder="Password"
        autoComplete="current-password"
        className="w-full rounded-[10px] border border-[#dddfe2] px-4 py-[14px] text-[17px] text-[#1c1e21] placeholder-[#96999e] outline-none transition-shadow focus:border-[#1877F2] focus:shadow-[0_0_0_2px_rgba(24,119,242,0.25)] lg:rounded-[6px]"
      />
      <button
        type="submit"
        className="mt-1 w-full rounded-full bg-[#1877F2] py-3 text-[1.0625rem] font-bold tracking-wide text-white transition-colors hover:bg-[#166FE5] lg:rounded-[6px] lg:py-2.5"
      >
        Log in
      </button>
    </form>
  )
}
