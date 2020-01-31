import { StyleSheet, Dimensions, Platform } from 'react-native'
import { isIphoneX, isIphone5 } from 'app/utils/device'

import { Colors, Fonts, Metrics } from 'app/themes'

const screenWidth = Dimensions.get('window').width
const halfScreenWidth = Math.floor(screenWidth / 2)

const EXTRA_BOTTOM = isIphoneX() ? 34 : 0

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  slide: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginTop: 8
  },
  image: {
    width: isIphone5() ? 300 : 327,
    height: isIphone5() ? 200 : 258
  },
  text: {
    ...Fonts.style.normal,
    color: '#071931',
    textAlign: 'center',
    paddingHorizontal: Metrics.u(1),
    marginBottom: 94,
    lineHeight: 22
  },
  title: {
    ...Fonts.style.largeBold,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Metrics.u(1),
    marginTop: 32
  },
  nextBtn: {
    backgroundColor: '#0038FF',
    height: 44,
    width: 147,
    justifyContent: 'center',
    borderRadius: 100,
    position: 'absolute',
    left: halfScreenWidth - 76,
    bottom: Metrics.u(9) + EXTRA_BOTTOM
  },
  nextTxt: {
    color: Colors.white,
    textAlign: 'center',
    ...Fonts.style.largeBold
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Metrics.u(2),
    backgroundColor: Colors.white
  },
  skipBtn: { position: 'absolute', right: 16, top: 15 },
  skipTxt: { color: '#0038FF', ...Fonts.style.bold },
  activeDotStyle: {
    backgroundColor: '#0038FF',
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 4
  },
  dotStyle: {
    backgroundColor: '#c4c4c4',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4
  },
  logo: {
    height: 20,
    width: 37
  }
})

export default styles
