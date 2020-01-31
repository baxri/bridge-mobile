import { elementById as $ } from './utils/testHelpers'
import faker from 'faker'

describe('Sign Up', () => {
  const registerScreen = () => $('registerScreen')
  const firstNameField = () => $('registerFirstNameField')
  const lastNameField = () => $('registerLastNameField')
  const emailField = () => $('registerEmailField')
  const passwordField = () => $('registerPasswordField')
  const signUpButton = () => $('registerSignUpButton')

  beforeEach(async () => {
    await $('rightNavButton').tap()
  })

  it('displays error messages when fields are invalid', async () => {
    await registerScreen().swipe('down')
    await signUpButton().tap()
    await expect($('registerFirstNameFieldError')).toBeVisible()
    await expect($('registerLastNameFieldError')).toBeVisible()
    await expect($('registerEmailFieldError')).toBeVisible()
    await expect($('registerPasswordFieldError')).toBeVisible()
  })

  it('displays an error message when server returns an error', async () => {
    await firstNameField().typeText(faker.name.firstName())
    await lastNameField().typeText(faker.name.lastName())
    await emailField().typeText('invalid email')
    await passwordField().typeText('password')
    await registerScreen().swipe('down')
    await signUpButton().tap()
    await expect($('registerErrorMessage')).toBeVisible()
  })

  it('goes to login screen when login link is tapped', async () => {
    await registerScreen().swipe('down')
    await $('registerLoginLink').tap()
    await expect($('loginScreen')).toBeVisible()
  })

  it('goes to intro home screen when registration is successful', async () => {
    await firstNameField().typeText(faker.name.firstName())
    await lastNameField().typeText(faker.name.lastName())
    await emailField().typeText(faker.internet.email())
    await passwordField().typeText(faker.internet.password())
    await registerScreen().swipe('down')
    await signUpButton().tap()
    await expect($('introHomeScreen')).toBeVisible()
  })
})
