import { elementById as $ } from './utils/testHelpers'
import { userWithIntros, userWithNoIntros, loginUser } from './utils/users'
import { contact3 } from './utils/contacts'

describe('Intro Home', () => {
  const introHomeScreen = () => $('introHomeScreen')
  const introListScreen = () => $('introListScreen')
  const backButton = () => $('backNavButton')

  it('does not display intro stats when user has not made any intros yet', async () => {
    await loginUser(userWithNoIntros)
    await expect($('introStats')).toNotExist()
  })

  it('goes back to login screen when log out is tapped', async () => {
    await $('rightNavButton').tap()
    await $('menuLogOutLink').tap()
    await expect($('loginScreen')).toExist()
  })

  it('displays intro stats when user has already made intros', async () => {
    await loginUser(userWithIntros)
    await $('introHomeNewIntroButton').tap()
    await expect($('introCreateFromScreen')).toExist()
    await backButton().tap()
    await $('introStatsIntrosWaitingConfirmationLink').tap()
    await expect(introListScreen()).toExist()
    await backButton().tap()
    await $('introStatsIntrosWithoutReplyLink').tap()
    await expect(introListScreen()).toExist()
    await backButton().tap()
    await expect($('introStatsIntroStatsBox')).toBeVisible()
    await introHomeScreen().swipe('up')
    await $('introStatsRecentContactLink')
      .atIndex(0)
      .tap()
    await expect($('contactScreen')).toBeVisible()
    await backButton().tap()
    await $('introStatsActivityLink')
      .atIndex(0)
      .tap()
    await expect($('introScreen')).toBeVisible()
  })
})
