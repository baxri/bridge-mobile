import { StyleSheet } from 'react-native'
import { Colors, Fonts } from 'app/themes'
import { isIphone5 } from 'app/utils/device'

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingBottom: 2,
    paddingHorizontal: 4,
    backgroundColor: Colors.slate05,
    borderTopWidth: 0.5,
    borderTopColor: Colors.slate60
  },
  tabIcon: { width: 30, height: 28 },
  tabIconCenter: { width: 38, height: 38 },
  tabItem: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: isIphone5() ? 50 : 70
  },
  createIntro: {
    color: Colors.royal,
    fontSize: 10
  },
  badges: { position: 'absolute', top: -2, right: 12 }
})

styles.withProps = ({ isActive }) =>
  StyleSheet.create({
    itemText: {
      color: isActive ? Colors.charcoal : Colors.slate60,
      fontSize: Fonts.size.tiny
    }
  })

export default styles
