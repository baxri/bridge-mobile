import { elementById as $ } from './utils/testHelpers'
import { userWithIntros } from './utils/users'

describe('Login', () => {
  const emailField = () => $('loginEmailField')
  const passwordField = () => $('loginPasswordField')
  const loginButton = () => $('loginLoginButton')

  it('displays error messages when fields are invalid', async () => {
    await loginButton().tap()
    await expect($('loginEmailFieldError')).toBeVisible()
    await expect($('loginPasswordFieldError')).toBeVisible()
  })

  it('displays an error message when server returns an error', async () => {
    await emailField().typeText('invalid email')
    await passwordField().typeText('invalid password')
    await loginButton().tap()
    await expect($('loginErrorMessage')).toBeVisible()
  })

  it('goes to intro home screen when login is successful', async () => {
    await emailField().typeText(userWithIntros.email)
    await passwordField().typeText(userWithIntros.password)
    await loginButton().tap()
    await expect($('introHomeScreen')).toBeVisible()
  })
})
