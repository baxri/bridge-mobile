export const palette = {
  transparent: 'transparent',
  white: 'white',
  black: 'black',
  red: 'red',

  // Brand colors v1
  offwhite: '#FAFAFA',
  grey: '#9B9B9B',
  darkgrey: '#516173',
  lightgrey: '#e5e5e5',
  lightergrey: '#F5F6F7',
  primary: '#047BFE', // Blue
  primaryV2: '#0038FF', // darker Blue
  primaryDark: '#212529', // Almost black
  error: '#E62117', // red
  green: '#0EA02E', // green
  placeholder: '#626262', // grey placeholder
  label: '#E5E5E5', // grey label
  linkedin: '#0077B5', // grey linkedin
  twitter: '#1DA1F2', // grey twitter
  link: '#0038FF', // grey twitter

  great: '#6EC682',
  ok: '#97B0C8',
  not_good: '#EBB449',

  // Brand colors v2
  royal: '#0038FF',
  royal05: '#F2F5FF',
  ruby: '#E13535',
  ruby20: '#F9D7D7',
  honey: '#E19500',
  sky: '#568FFF',
  kelly: '#0EA02E',
  charcoal: '#0D1531',
  charcoal20: 'rgba(13, 21, 48, 0.2)',
  charcoal80: '#3D445A',
  slate100: '#81879C',
  slate60: '#B3B7C4',
  slate30: '#D9DBE1',
  slate20: '#E6E8ED',
  slate15: '#ECEDF0',
  slate10: '#F2F3F5',
  slate05: '#F9F9FA'
}

export default {
  ...palette,
  background: palette.white,
  backgroundLighter: palette.white,
  background_disabled: palette.lightgrey,
  statusBar: {
    background: palette.primary
  },
  text: palette.primaryDark,
  text_disabled: palette.grey,
  icon: palette.primary,
  icon_dark: palette.primaryDark,
  icon_disabled: palette.grey,
  button: {
    background: palette.transparent,
    text: palette.primary,
    border: palette.primary,
    border_disabled: palette.grey,
    primary: {
      background: palette.royal,
      text: palette.white,
      border: palette.royal
    },
    secondary: {
      background: palette.slate20,
      text: palette.charcoal,
      border: palette.slate20
    },
    danger: {
      background: palette.ruby,
      text: palette.white,
      border: palette.ruby
    },
    primary_alt: {
      background: palette.transparent,
      text: palette.royal,
      border: palette.royal
    },
    secondary_alt: {
      background: palette.transparent,
      text: palette.charcoal,
      border: palette.slate60
    },
    danger_alt: {
      background: palette.transparent,
      text: palette.ruby,
      border: palette.ruby
    },
    primary_transparent: {
      background: palette.transparent,
      text: palette.royal,
      border: palette.transparent
    },
    secondary_transparent: {
      background: palette.transparent,
      text: palette.charcoal,
      border: palette.transparent
    },
    danger_transparent: {
      background: palette.ruby,
      text: palette.ruby,
      border: palette.transparent
    }
  },
  input: {
    border: palette.lightgrey
  }
}
