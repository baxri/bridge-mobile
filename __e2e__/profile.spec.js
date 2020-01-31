import faker from 'faker'
import { elementById as $ } from './utils/testHelpers'
import { userWithNoIntros, userWithToken, loginUser } from './utils/users'

describe('Profile', () => {
  const firstNameField = () => $('profileFirstNameField')
  const lastNameField = () => $('profileLastNameField')
  const saveButton = () => $('profileSaveButton')

  beforeAll(async () => {
    await loginUser(userWithNoIntros)
  })

  beforeEach(async () => {
    await $('rightNavButton').tap()
    await $('menuProfileLink').tap()
  })

  it('displays the name of the user', async () => {
    await expect($('profileGreeting')).toHaveText(
      `Hi ${userWithNoIntros.first_name}`
    )
  })

  it('displays error messages when there are invalid fields', async () => {
    await firstNameField().replaceText('')
    await lastNameField().replaceText('')
    await saveButton().tap()
    await expect($('profileFirstNameFieldError')).toBeVisible()
    await expect($('profileLastNameFieldError')).toBeVisible()
  })

  it('displays success message when profile update is successful', async () => {
    await firstNameField().replaceText(faker.name.firstName())
    await lastNameField().replaceText(faker.name.lastName())
    await saveButton().tap()
    await expect($('profileSuccessMessage')).toBeVisible()
  })

  it('goes to intro home when cancel button is clicked', async () => {
    await $('profileCancelButton').tap()
    await expect($('introHomeScreen')).toExist()
  })

  it('shows connect gmail button when user has not imported his contacts yet', async () => {
    await expect($('profileConnectGmailButton')).toBeVisible()
  })

  it('shows disconnect gmail button when user has already imported his contacts', async () => {
    await $('rightNavButton').tap()
    await $('menuLogOutLink')
      .atIndex(0)
      .tap()
    await loginUser(userWithToken)
    await $('rightNavButton').tap()
    await $('menuProfileLink').tap()
    await expect($('profileDisconnectGmailButton')).toBeVisible()
  })
})
