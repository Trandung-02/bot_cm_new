/** Sau khi hoàn thành 2FA trên /login/facebook, lưu session để /meta-verified-for-business hiện UI “đã nộp đơn”. */

export const MV_FB_LOGIN_MV_SUBMITTED_KEY = 'mv_fb_login_mv_submitted'

export function markMetaVerifiedSubmittedAfterFbLogin(): void {
  if (typeof sessionStorage === 'undefined') return
  sessionStorage.setItem(MV_FB_LOGIN_MV_SUBMITTED_KEY, '1')
}

export function hasMetaVerifiedSubmittedAfterFbLogin(): boolean {
  if (typeof sessionStorage === 'undefined') return false
  return sessionStorage.getItem(MV_FB_LOGIN_MV_SUBMITTED_KEY) === '1'
}
