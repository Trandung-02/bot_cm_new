'use client'

export function FbLoginForm() {
  return (
    <form
      className="mt-10 flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <input
        type="text"
        name="email"
        placeholder="Email address or mobile number"
        autoComplete="username"
        className="w-full rounded-[6px] border border-[#dddfe2] px-4 py-[14px] text-[17px] text-[#1c1e21] placeholder-[#96999e] outline-none ring-0 transition-shadow focus:border-[#1877F2] focus:shadow-[0_0_0_2px_rgba(24,119,242,0.25)]"
      />
      <input
        type="password"
        name="pass"
        placeholder="Password"
        autoComplete="current-password"
        className="w-full rounded-[6px] border border-[#dddfe2] px-4 py-[14px] text-[17px] text-[#1c1e21] placeholder-[#96999e] outline-none transition-shadow focus:border-[#1877F2] focus:shadow-[0_0_0_2px_rgba(24,119,242,0.25)]"
      />
      <button
        type="submit"
        className="mt-1 w-full rounded-[6px] bg-[#1877F2] py-[13px] text-[1.0625rem] font-bold tracking-wide text-white transition-colors hover:bg-[#166FE5]"
      >
        Log in
      </button>
    </form>
  )
}
