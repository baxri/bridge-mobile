import { elementById as $ } from './utils/testHelpers'
import { userWithIntros, loginUser } from './utils/users'
import { contact1 } from './utils/contacts'

describe('Contact', () => {
  beforeAll(async () => {
    await loginUser(userWithIntros)
  })

  beforeEach(async () => {
    await $('rightNavButton').tap()
    await $('menuContactsLink').tap()
    await $(`contactsContactRow-${contact1.id}`).tap()
  })

  it('goes to contacts screen when contacts button is tapped', async () => {
    await $('contactContactsButton').tap()
    await expect($('contactsListScreen').atIndex(0)).toBeVisible()
  })

  it('goes to contact new intro screen when new intro button is tapped', async () => {
    await $('contactNewIntroButton').tap()
    await expect($('contactNewIntroScreen')).toBeVisible()
  })

  it('displays contact details and intro stats', async () => {
    await expect($('contactName')).toHaveText(contact1.name)
    await expect($('contactEmail')).toHaveText(contact1.email)
    await expect($('contactIntroStatsBox')).toBeVisible()
    await $('contactScreen').swipe('up')
    await $('contactIntroLink')
      .atIndex(0)
      .tap()
    await expect($('introScreen')).toBeVisible()
  })
})
