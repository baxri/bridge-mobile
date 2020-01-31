import { elementById as $ } from './utils/testHelpers'
import { userWithIntros, loginUser } from './utils/users'
import { contact1, contact2, contact3 } from './utils/contacts'

describe('Contacts', () => {
  const contactName = contactId => $(`contactsContactName-${contactId}`)

  beforeAll(async () => {
    await loginUser(userWithIntros)
  })

  beforeEach(async () => {
    await $('rightNavButton').tap()
    await $('menuContactsLink').tap()
  })

  it('displays contacts that have been introduced', async () => {
    await expect(contactName(contact1.id)).toHaveText(contact1.name)
    await expect(contactName(contact2.id)).toHaveText(contact2.name)
    await expect(contactName(contact3.id)).toHaveText(contact3.name)
  })

  it('goes to contact page when a contact row is tapped', async () => {
    await $(`contactsContactRow-${contact1.id}`).tap()
    await expect($('contactScreen')).toExist()
  })
})
