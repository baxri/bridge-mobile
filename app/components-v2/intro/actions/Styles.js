import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

const styles = StyleSheet.create({
  ...Styles,

  container: {
    backgroundColor: Colors.white,
    padding: Metrics.u(2)
  },

  messageBox: {
    flex: 1,
    backgroundColor: Colors.primary,
    height: 130,
    padding: Metrics.u(2)
  },

  messageBoxLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  messageBoxRight: {
    flex: 1
  },

  messageText: {
    color: Colors.white,
    fontSize: Fonts.size.regular
  },

  leftSide: {
    flex: 0.15,
    borderRightWidth: 2,
    borderRightColor: Colors.lightgrey
  },

  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },

  rightSide: {
    flex: 0.85,
    paddingLeft: Metrics.u(1)
  },

  awaitingText: {
    fontSize: Fonts.size.large,
    marginBottom: Metrics.u(1),
    textAlign: 'center'
  },

  resend: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  resendText: {
    fontSize: Fonts.size.regular,
    color: Colors.primary
  },

  cancel: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  cancelText: {
    fontSize: Fonts.size.regular,
    color: Colors.error
  },

  confirm: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  confirmText: {
    fontSize: Fonts.size.regular,
    color: Colors.primary
  },

  feedbackContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.grey,
    height: 193,
    flex: 1,
    borderRadius: 8,
    padding: Metrics.u(2),
    paddingBottom: Metrics.u(3),
    marginBottom: Metrics.u(1)
  },
  feedbackContainerButtons: {
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  feedBackButton: {
    width: 71,
    height: 71,
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedBackButtonImagesContainer: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  feedBackButtonImages: {
    width: 40,
    height: 40,
    marginBottom: 5
  },
  feedBackText: {
    textAlign: 'center'
  }
})

export default styles
