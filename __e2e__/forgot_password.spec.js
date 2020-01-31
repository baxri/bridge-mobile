import { elementById as $ } from './utils/testHelpers'
import { userWithNoIntros } from './utils/users'

describe('Forgot Password', () => {
  const emailField = () => $('forgotPasswordEmailField')
  const resetPasswordButton = () => $('forgotPasswordResetPasswordButton')

  beforeEach(async () => {
    await $('loginForgotPasswordButton').tap()
  })

  it('displays error messages when fields are invalid', async () => {
    await resetPasswordButton().tap()
    await expect($('forgotPasswordEmailFieldError')).toBeVisible()
  })

  it('displays an error message when server returns an error', async () => {
    await emailField().typeText('invalid email')
    await resetPasswordButton().tap()
    await expect($('forgotPasswordErrorMessage')).toBeVisible()
  })

  it('goes to login screen when successful', async () => {
    await emailField().typeText(userWithNoIntros.email)
    await resetPasswordButton().tap()
    await expect($('loginScreen')).toExist()
  })
})
