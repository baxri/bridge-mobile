import { elementById as $ } from './utils/testHelpers'
import { userWithIntros, loginUser } from './utils/users'
import {
  initializedIntro,
  noReplyIntro,
  confirmedIntro,
  canceledIntro,
  publishedIntro,
  acceptedIntro,
  rejectedIntro,
  completedIntro,
  archivedIntro
} from './utils/intros'

describe('Intro List', () => {
  const introList = () => $('introListScreen')
  const introListItem = intro => $(`introListItem-${intro.id}`)
  const withIntroListItem = (id, intro) =>
    element(by.id(id).withAncestor(by.id(`introListItem-${intro.id}`)))
  const selectFilter = async filter => {
    await $('introListFilterButton').tap()
    await element(by.text(filter)).tap()
  }

  const expectIntrosToExist = async intros => {
    for (let i = 0; i < intros.length; i++)
      await expect(introListItem(intros[i])).toExist()
  }

  const expectIntrosToNotExist = async intros => {
    for (let i = 0; i < intros.length; i++)
      await expect(introListItem(intros[i])).toNotExist()
  }

  beforeAll(async () => {
    await loginUser(userWithIntros)
  })

  beforeEach(async () => {
    await $('rightNavButton').tap()
    await $('menuIntrosLink').tap()
  })

  it('goes to new intro screen when new intro button is tapped', async () => {
    await $('introListNewIntroButton').tap()
    await expect($('introCreateFromScreen')).toExist()
  })

  it('goes to intro detail screen when an intro item is tapped', async () => {
    await withIntroListItem('introListItemLink', completedIntro).tap()
    await expect($('introScreen')).toExist()
  })

  it('displays all intros when all intros filter is selected', async () => {
    await selectFilter('All Intros')
    await expectIntrosToExist([archivedIntro, completedIntro, rejectedIntro])
    await introList().swipe('up')
    await expectIntrosToExist([confirmedIntro, noReplyIntro, initializedIntro])
  })

  it('displays confirmed intros only when confirm intro filter is selected', async () => {
    await selectFilter('Confirm Intros')
    await expectIntrosToExist([confirmedIntro])
    await expectIntrosToNotExist([
      initializedIntro,
      noReplyIntro,
      canceledIntro,
      publishedIntro,
      acceptedIntro,
      rejectedIntro,
      completedIntro,
      archivedIntro
    ])
  })

  it('displays no reply intros only when no reply filter is selected', async () => {
    await selectFilter('No Reply Intros')
    await expectIntrosToExist([noReplyIntro, archivedIntro])
    await expectIntrosToNotExist([
      initializedIntro,
      confirmedIntro,
      canceledIntro,
      publishedIntro,
      acceptedIntro,
      rejectedIntro,
      completedIntro
    ])
  })

  it('displays active intros only when active intro filter is selected', async () => {
    await selectFilter('Active Intros')
    await expectIntrosToExist([acceptedIntro, publishedIntro, confirmedIntro])
    await introList().swipe('up')
    await expectIntrosToExist([initializedIntro, noReplyIntro])
    await expectIntrosToNotExist([
      canceledIntro,
      rejectedIntro,
      completedIntro,
      archivedIntro
    ])
  })

  it('displays completed intros only when completed intros filter is selected', async () => {
    await selectFilter('Completed Intros')
    await expectIntrosToExist([completedIntro])
    await expectIntrosToNotExist([
      initializedIntro,
      noReplyIntro,
      confirmedIntro,
      canceledIntro,
      publishedIntro,
      acceptedIntro,
      rejectedIntro,
      archivedIntro
    ])
  })

  it('displays declined intros only when declined intros filter is selected', async () => {
    await selectFilter('Declined Intros')
    await expectIntrosToExist([canceledIntro, rejectedIntro])
    await expectIntrosToNotExist([
      initializedIntro,
      noReplyIntro,
      confirmedIntro,
      publishedIntro,
      acceptedIntro,
      completedIntro,
      archivedIntro
    ])
  })

  it('displays archived intros only when archived intros filter is selected', async () => {
    await selectFilter('Archived Intros')
    await expectIntrosToExist([archivedIntro])
    await expectIntrosToNotExist([
      initializedIntro,
      noReplyIntro,
      confirmedIntro,
      canceledIntro,
      publishedIntro,
      acceptedIntro,
      rejectedIntro,
      completedIntro
    ])
  })

  it('displays a resend email button when an intro is initialized', async () => {
    await selectFilter('Active Intros')
    await introList().swipe('up')
    await expect(
      withIntroListItem('introListItemResendEmailButton', initializedIntro)
    ).toBeVisible()
  })

  it('displays a confirm button when an intro is confirmed', async () => {
    await selectFilter('Confirm Intros')
    await withIntroListItem(
      'introListItemConfirmIntroButton',
      confirmedIntro
    ).tap()
    await expect($('introPublishScreen').atIndex(0)).toExist()
  })

  it('displays a reconfirm button when an intro is published', async () => {
    await selectFilter('Active Intros')
    await withIntroListItem(
      'introListItemConfirmIntroButton',
      publishedIntro
    ).tap()
    await expect($('introPublishScreen').atIndex(0)).toExist()
  })

  it('displays a rejected label when an intro is canceled or rejected', async () => {
    await selectFilter('Declined Intros')
    await expect(
      withIntroListItem('introListItemRejected', canceledIntro)
    ).toBeVisible()
    await expect(
      withIntroListItem('introListItemRejected', rejectedIntro)
    ).toBeVisible()
  })

  it('displays a completed label when an intro is completed', async () => {
    await selectFilter('Completed Intros')
    await expect(
      withIntroListItem('introListItemCompleted', completedIntro)
    ).toBeVisible()
  })
})
