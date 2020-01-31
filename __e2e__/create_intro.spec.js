import faker from 'faker'
import { elementById as $ } from './utils/testHelpers'
import { userWithIntros, loginUser } from './utils/users'
import { contact1, contact2 } from './utils/contacts'

describe('Create Intro', () => {
  const field = screen =>
    element(by.id('introCreateField').withAncestor(by.id(screen)))
  const contactSuggestion = screen =>
    element(by.id('introCreateContactSuggestion').withAncestor(by.id(screen)))
  const nextButton = screen =>
    element(by.id('introCreateNextButton').withAncestor(by.id(screen)))
  const messageField = () => $('introCreateConfirmMessageField')
  const sendButton = () => $('introCreateConfirmSendButton')
  const skipOptInButton = () => $('introCreateConfirmSkipOptInButton')
  const publishScreen = () => $('introCreatePublishScreen')
  const publishToEmailField = () => $('introCreatePublishToEmailField')
  const publishSendButton = () => $('introCreatePublishSendButton')

  beforeAll(async () => {
    await loginUser(userWithIntros)
  })

  beforeEach(async () => {
    await $('introHomeNewIntroButton').tap()
  })

  it('does not proceed when there are invalid fields', async () => {
    await expect(nextButton('introCreateFromScreen')).toNotExist()
    await field('introCreateFromScreen').typeText(faker.name.firstName())
    await nextButton('introCreateFromScreen').tap()

    await expect(nextButton('introCreateFromEmailScreen')).toNotExist()
    await field('introCreateFromEmailScreen').typeText(faker.internet.email())
    await nextButton('introCreateFromEmailScreen').tap()

    await expect(nextButton('introCreateToScreen')).toNotExist()
    await field('introCreateToScreen').typeText(faker.name.firstName())
    await nextButton('introCreateToScreen').tap()

    await nextButton('introCreateToEmailScreen').tap()
    await nextButton('introCreateToLinkedInScreen').tap()

    await messageField().replaceText('')
    await messageField().tap()
    await messageField().typeText('.')
    await messageField().clearText()
    await $('introCreateConfirmScreen').tap()
    await sendButton().tap()
    await expect($('introCreateConfirmMessageFieldError')).toBeVisible()
    await messageField().tap()
    await messageField().typeText(faker.lorem.sentence())
    await $('introCreateConfirmScreen').tap()
    await skipOptInButton().tap()

    await publishToEmailField().replaceText('')
    await publishScreen().tap()
    await publishScreen().swipe('up')
    await publishSendButton().tap()
    await expect($('introCreatePublishToEmailFieldError')).toBeVisible()
  })

  it('displays contact suggestions when typing in a name or email', async () => {
    await field('introCreateFromScreen').typeText(contact1.name)
    await contactSuggestion('introCreateFromScreen').tap()
    await $('backNavButton').tap()
    await nextButton('introCreateFromScreen').tap()

    await field('introCreateFromEmailScreen').typeText(contact1.email)
    await contactSuggestion('introCreateFromEmailScreen').tap()

    await field('introCreateToScreen').typeText(contact2.name)
    await contactSuggestion('introCreateToScreen').tap()
    await $('backNavButton').tap()
    await nextButton('introCreateToScreen').tap()

    await field('introCreateToEmailScreen').typeText(contact2.email)
    await contactSuggestion('introCreateToEmailScreen').tap()
    await expect($('introCreateToLinkedInScreen')).toExist()
  })

  it('creates the intro when fields are valid', async () => {
    await field('introCreateFromScreen').typeText(faker.name.firstName())
    await nextButton('introCreateFromScreen').tap()
    await field('introCreateFromEmailScreen').typeText(faker.internet.email())
    await nextButton('introCreateFromEmailScreen').tap()
    await field('introCreateToScreen').typeText(faker.name.firstName())
    await nextButton('introCreateToScreen').tap()
    await nextButton('introCreateToEmailScreen').tap()
    await nextButton('introCreateToLinkedInScreen').tap()
    await sendButton().tap()
    await expect($('introCreateDoneScreen')).toBeVisible()
    await $('introCreateDoneNewIntroForButton').tap()
    await expect($('introCreateToScreen').atIndex(0)).toExist()
  })

  it('publishes the intro when skip opt in is selected', async () => {
    await field('introCreateFromScreen').typeText(faker.name.firstName())
    await nextButton('introCreateFromScreen').tap()
    await field('introCreateFromEmailScreen').typeText(faker.internet.email())
    await nextButton('introCreateFromEmailScreen').tap()
    await field('introCreateToScreen').typeText(faker.name.firstName())
    await nextButton('introCreateToScreen').tap()
    await field('introCreateToEmailScreen').typeText(faker.internet.email())
    await nextButton('introCreateToEmailScreen').tap()
    await nextButton('introCreateToLinkedInScreen').tap()
    await skipOptInButton().tap()
    await expect(publishToEmailField()).toNotExist()
    await publishSendButton().tap()
    await expect($('introCreateDoneScreen')).toBeVisible()
    await $('introCreateDoneNewIntroToButton').tap()
    await expect($('introCreateFromScreen').atIndex(0)).toExist()
  })
})
