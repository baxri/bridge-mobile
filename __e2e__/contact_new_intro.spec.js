import { elementById as $ } from './utils/testHelpers'
import { userWithIntros, loginUser } from './utils/users'
import { contact1 } from './utils/contacts'

describe('Contact New Intro', () => {
  beforeAll(async () => {
    await loginUser(userWithIntros)
  })

  beforeEach(async () => {
    await $('rightNavButton').tap()
    await $('menuContactsLink').tap()
    await $(`contactsContactRow-${contact1.id}`).tap()
    await $('contactNewIntroButton').tap()
  })

  it('displays contact details', async () => {
    await expect($('contactNewIntroName')).toHaveText(contact1.name)
    await expect($('contactNewIntroEmail')).toHaveText(contact1.email)
  })

  it('prefills the from fields on new intro screen when new intro for is tapped', async () => {
    await $('contactNewIntroForButton').tap()
    await expect($('introCreateLabel')).toHaveText('To')
  })

  it('prefills the to fields on new intro screen when new intro to is tapped', async () => {
    await $('contactNewIntroToButton').tap()
    await expect($('introCreateLabel')).toHaveText('Intro')
  })
})
