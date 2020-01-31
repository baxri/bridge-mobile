import { StyleSheet } from 'react-native'

import { Styles, Metrics, Colors, Fonts } from 'app/themes'

export default StyleSheet.create({
  ...Styles,

  // Button container
  container: {
    marginVertical: Metrics.u(1)
  },
  container_disabled: {
    opacity: 0.3
  },

  // Button styles and themes
  button: {
    ...Fonts.style.button,
    ...Styles.text_center,
    ...Metrics.button.common,
    ...Metrics.button.large,
    backgroundColor: Colors.button.primary.background,
    borderColor: Colors.button.primary.border,
    paddingVertical: Metrics.u(1.5),
    paddingHorizontal: Metrics.u(3),
    color: Colors.button.primary.text,
    overflow: 'hidden'
  },
  button_small: {
    ...Fonts.style.button_small,
    ...Metrics.button.small,
    paddingVertical: Metrics.u(1),
    paddingHorizontal: Metrics.u(2)
  },
  button_full: {
    width: '100%'
  },
  button_loading: {
    color: Colors.transparent
  },
  button_secondary: {
    backgroundColor: Colors.button.secondary.background,
    borderColor: Colors.button.secondary.border,
    color: Colors.button.secondary.text
  },
  button_danger: {
    backgroundColor: Colors.button.danger.background,
    borderColor: Colors.button.danger.border,
    color: Colors.button.danger.text
  },
  button_alt: {
    backgroundColor: Colors.button.primary_alt.background,
    borderColor: Colors.button.primary_alt.border,
    color: Colors.button.primary_alt.text
  },
  button_secondary_alt: {
    backgroundColor: Colors.button.secondary_alt.background,
    borderColor: Colors.button.secondary_alt.border,
    color: Colors.button.secondary_alt.text
  },
  button_danger_alt: {
    backgroundColor: Colors.button.danger_alt.background,
    borderColor: Colors.button.danger_alt.border,
    color: Colors.button.danger_alt.text
  },
  button_transparent: {
    ...Fonts.style.button_text,
    backgroundColor: Colors.white,
    borderColor: Colors.white,
    color: Colors.button.primary_transparent.text,
    paddingVertical: Metrics.u(0.5),
    paddingHorizontal: Metrics.u(0.5)
  },
  button_secondary_transparent: {
    color: Colors.button.secondary_transparent.text
  },
  button_danger_transparent: {
    color: Colors.button.danger_transparent.text
  },

  // Overlay
  overlay: {
    ...Metrics.button.large,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 9999
  },
  overlay_small: {
    ...Metrics.button.small
  },

  // Loading indicator
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  }
})
