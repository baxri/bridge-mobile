import { elementById as $ } from './testHelpers'

export const userWithNoIntros = {
  email: 'user_with_no_intros@test.com',
  password: 'testing',
  first_name: 'No Intros',
  last_name: 'User'
}

export const userWithIntros = {
  email: 'user_with_intros@test.com',
  password: 'testing'
}

export const userWithToken = {
  email: 'user_with_token@test.com',
  password: 'testing'
}

export const userWithConfimedIntro = {
  email: 'user_with_confirmed_intro@test.com',
  password: 'testing'
}

export const loginUser = async user => {
  await $('loginEmailField').typeText(user.email)
  await $('loginPasswordField').typeText(user.password)
  await $('loginLoginButton').tap()
}
