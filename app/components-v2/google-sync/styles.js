import { StyleSheet } from 'react-native'

import { Colors, Fonts, Metrics } from 'app/themes'
import { isIphone5 } from 'app/utils/device'

const iphone5 = isIphone5()

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  subContainer: {
    alignItems: 'center',
    padding: Metrics.u(3),
    flex: 1
  },
  headingSpacer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  handshakeLogo: {
    width: iphone5 ? 100 : 160,
    height: iphone5 ? 100 : 160,
    borderRadius: iphone5 ? 50 : 80,
    backgroundColor: '#568FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: iphone5 ? 0 : 8,
    marginBottom: iphone5 ? 8 : 16
  },
  handshakeImage: {
    width: iphone5 ? 60 : 100,
    height: iphone5 ? 60 : 100
  },
  title: { marginTop: 24, ...Fonts.style.largeBold },
  text: { marginTop: 16, lineHeight: 22 },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.black,
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: iphone5 ? 12 : 16,
    paddingVertical: iphone5 ? 6 : 10,
    marginTop: iphone5 ? 10 : 24
  },
  iconGoogle: { width: 18, height: 18, marginLeft: 8 },
  privacyTxt: {
    fontSize: 12,
    color: '#82879C',
    textAlign: 'justify',
    marginTop: iphone5 ? 14 : 30
  },
  largeBold: {
    ...Fonts.style.largeBold,
    fontSize: iphone5 ? 16 : 18
  },
  contactsCount: { fontSize: 14, color: '#82879C', marginTop: 8 },
  closeBtnImage: {
    width: 14,
    height: 14
  },
  closeBtnContainer: {
    padding: 10,
    marginLeft: 10
  },
  noticeContainer: {
    backgroundColor: '#F9D7D7',
    paddingHorizontal: Metrics.u(2),
    paddingVertical: Metrics.u(2)
  }
})

export default styles
