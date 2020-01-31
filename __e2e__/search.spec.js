import { elementById as $ } from './utils/testHelpers'
import { userWithIntros, loginUser } from './utils/users'

describe('Search', () => {
  const searchInput = () => $('searchInput')

  beforeAll(async () => {
    await loginUser(userWithIntros)
  })

  beforeEach(async () => {
    await $('rightNavButton').tap()
    await $('menuSearchLink').tap()
  })

  it('displays search result', async () => {
    await searchInput().typeText('contact')
    await expect($('searchContactsResult')).toExist()
    await expect($('searchIntrosResult')).toExist()
  })

  it('displays the detail screen when search result item is tapped', async () => {
    await searchInput().typeText('contact')
    await $('searchContactsResultItem')
      .atIndex(0)
      .tap()
    await expect($('contactScreen')).toExist()
    await $('backNavButton').tap()
    await $('searchScreen').swipe('up')
    await $('searchIntrosResultItem')
      .atIndex(0)
      .tap()
    await expect($('introScreen')).toExist()
  })
})
