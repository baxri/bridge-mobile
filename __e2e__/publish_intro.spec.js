import faker from 'faker'
import { elementById as $ } from './utils/testHelpers'
import { userWithConfimedIntro, loginUser } from './utils/users'
import { introToBePublished } from './utils/intros'

describe('Publish Intro', () => {
  const introPublish = () => $('introPublishScreen')
  const toEmailField = () => $('introPublishToEmailField')
  const noteField = () => $('introPublishNoteField')
  const sendButton = () => $('introPublishSendButton')

  beforeAll(async () => {
    await loginUser(userWithConfimedIntro)
  })

  beforeEach(async () => {
    await $('rightNavButton').tap()
    await $('menuIntrosLink').tap()
    await $('introListItemConfirmIntroButton').tap()
  })

  it('displays error messages when there are invalid fields', async () => {
    await toEmailField().replaceText('')
    await introPublish().swipe('up')
    await sendButton().tap()
    await introPublish().swipe('down')
    await expect($('introPublishToEmailFieldError')).toExist()
  })

  it('shows the publish done screen when publish is successful', async () => {
    await toEmailField().replaceText(faker.internet.email())
    await noteField().typeText(faker.lorem.sentence())
    await introPublish().swipe('up')
    await sendButton().tap()
    await expect($('introPublishDoneScreen')).toBeVisible()
  })
})
