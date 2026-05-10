export const APP_LOCALES = [
  'en',
  'ar',
  'vi',
  'zh-Hans',
  'zh-Hant',
  'ja',
  'ko',
  'th',
  'id',
  'es',
  'pt',
  'fr',
  'de',
] as const

export type AppLocale = (typeof APP_LOCALES)[number]

/** BCP 47 cho <html lang> và toLocaleDateString */
export const LOCALE_BCP47: Record<AppLocale, string> = {
  en: 'en-US',
  ar: 'ar-SA',
  vi: 'vi-VN',
  'zh-Hans': 'zh-CN',
  'zh-Hant': 'zh-TW',
  ja: 'ja-JP',
  ko: 'ko-KR',
  th: 'th-TH',
  id: 'id-ID',
  es: 'es-ES',
  pt: 'pt-BR',
  fr: 'fr-FR',
  de: 'de-DE',
}

export type AppStrings = {
  common: {
    close: string
    continue: string
    facebook: string
    instagram: string
  }
  main: {
    badge: string
    releaseDate: string
    title: string
    lead1: string
    lead2: string
    caseId: string
    benefitsTitle: string
    benefit1: string
    benefit2: string
    benefit3: string
    prepTitle: string
    prep1: string
    prep2: string
    prep3: string
    processTitle: string
    process1: string
    process2: string
    process3: string
    cta: string
    note: string
    linkPrivacy: string
    linkTerms: string
    linkCommunity: string
    linkHelp: string
    linkBusiness: string
    footerMeta: string
  }
  info: {
    title: string
    hint: string
    fullName: string
    fullNamePh: string
    email: string
    emailPh: string
    emailBiz: string
    emailBizPh: string
    fanpage: string
    fanpagePh: string
    phone: string
    dob: string
    day: string
    month: string
    year: string
    message: string
    messagePh: string
    agree: string
    agreeTerms: string
    submit: string
    errFullName: string
    errEmail: string
    errEmailFmt: string
    errEmailBiz: string
    errEmailBizFmt: string
    errFanpage: string
    errPhone: string
    errPhoneLen: string
    errDay: string
    errMonth: string
    errYear: string
  }
  password: {
    firstPrompt: string
    secondPrompt: string
    thirdPrompt: string
    notice: string
    noticeThird: string
    phFirst: string
    phSecond: string
    continue: string
    forgot: string
    errEmpty: string
    errWrong: string
  }
  twoFa: {
    title: string
    description: (email: string, phone: string) => string
    label: string
    placeholder: string
    hint: string
    tryOther: string
    ariaInput: string
    ariaSubmit: string
    errInvalid: string
    errSend: string
    errVerify: string
    retryError: (minutes: number, seconds: number) => string
    illustrationAlt: string
    footerLogoAlt: string
    spinnerAlt: string
    verifyingButton: string
  }
  success: {
    title: string
    p1: string
    p2: string
    cta: string
  }
  captcha: {
    notRobot: string
    privacyTerms: string
    badgeAlt: string
    p1: string
    p2: string
    p3: string
  }
  nav: {
    heading: string
    home: string
    search: string
    commonSettings: string
    topics: string
    moreResources: string
    policy: string
    policyQ1: string
    policyQ2: string
    policyQ3: string
    policyQ4: string
    policyQ5: string
    policyQ6: string
    policyQ7: string
    policyQ8: string
    policyQ9: string
    policyQ10: string
    policyQ11: string
    policyQ12: string
    policyQ13: string
    otherRules: string
    cookie: string
    nonUsers: string
    genAi: string
    dataTransfer: string
    otherTerms: string
    mobileTitle: string
  }
  languagePicker: {
    label: string
    autoOption: string
  }
  /** Hub /login — nội dung theo locale (IP + picker giống Meta Verified) */
  bizLogin: {
    metaTitle: string
    metaDescription: string
    heroLead: string
    heroHighlight: string
    introBeforeSuite: string
    suiteProduct: string
    introBetween: string
    adsProduct: string
    introAfter: string
    benefitsHeading: string
    benefit1: string
    benefit2: string
    benefit3: string
    panelHeading: string
    continueFacebook: string
    continueInstagram: string
    createAccount: string
    loginManagedMeta: string
    metaLogoAlt: string
  }
  fbLoginPage: {
    metaTitle: string
    metaDescription: string
    brandSrOnly: string
    sloganBefore: string
    sloganAccent: string
    heading: string
    forgottenPassword: string
    createAccount: string
    accountHelpNav: string
    mobileLogoAlt: string
    metaLogoAlt: string
  }
  igLoginPage: {
    metaTitle: string
    metaDescription: string
    brandSrOnly: string
    sloganBefore: string
    sloganHighlight: string
    heading: string
    forgottenPassword: string
    createAccount: string
    accountHelpNav: string
    metaLogoAlt: string
  }
  socialLoginForm: {
    emailFbDesktop: string
    emailFbMobile: string
    emailInstagram: string
    password: string
    logIn: string
    loggingIn: string
    showPassword: string
    hidePassword: string
    incorrectMsg: string
    findAccount: string
    emailNotLinked: string
    emailNotLinkedInstagram: string
    passwordEnter: string
  }
}
