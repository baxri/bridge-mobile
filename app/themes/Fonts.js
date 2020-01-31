const type = {
  bold: 'Muli-Bold',
  base: 'Muli-Regular',
  muli: 'Muli-Regular'
}

const size = {
  input: 18,
  xlarge: 22,
  xxlarge: 28,
  xxxlarge: 34,
  xxxxlarge: 48,
  large: 18,
  regular: 16,
  medium: 14,
  small: 12,
  tiny: 10
}

const style = {
  regular: {
    fontFamily: type.base
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  bold: {
    fontFamily: type.bold,
    fontWeight: 'bold',
    fontSize: size.regular
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small
  },
  largeBold: {
    fontFamily: type.bold,
    fontWeight: 'bold',
    fontSize: size.large
  },
  smallBold: {
    fontFamily: type.bold,
    fontWeight: 'bold',
    fontSize: size.small
  },
  largeBold: {
    fontFamily: type.bold,
    fontWeight: 'bold',
    fontSize: size.large
  },
  button: {
    fontFamily: type.muli,
    fontSize: size.regular,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.4
  },
  button_small: {
    fontSize: size.medium,
    lineHeight: 18
  },
  button_text: {
    fontSize: size.medium,
    lineHeight: 23
  },
  link: {
    fontFamily: type.base,
    fontSize: size.regular
  }
}

export default {
  type,
  size,
  style
}
