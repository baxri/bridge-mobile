const INTRO_EMAIL_REMINDER_IN_SECONDS = 30
const CONFIRM_INTRO_EMAIL_REMINDER_IN_SECONDS = 30
// const INTRO_EMAIL_REMINDER_IN_SECONDS=432000 // should match with backend
// const CONFIRM_INTRO_EMAIL_REMINDER_IN_SECONDS=86400

export {
  INTRO_EMAIL_REMINDER_IN_SECONDS,
  CONFIRM_INTRO_EMAIL_REMINDER_IN_SECONDS
}

export const FLOWS = {
  FORWARDABLE: 'opt_in',
  NO_OPT_IN: 'fast'
}

export const INITIAL_CONTACT = {
  name: '',
  email: '',
  linkedin_profile_url: '',
  profile_pic_url: '',
  id: '',
  linkedinState: {
    valid: false,
    showWarning: false
  },
  isValid: true
}
