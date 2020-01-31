import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  base: {
    backgroundColor: '#fff'
  },
  loadingContainer: {
    paddingTop: 20,
    paddingBottom: 10
  },
  error: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#e62117',
    paddingTop: 20,
    paddingBottom: 10
  },
  message: {
    fontSize: 20,
    alignSelf: 'center',
    color: '#21D345',
    paddingTop: 20,
    paddingBottom: 10
  },
  listTitleStyle: {
    fontSize: 18,
    paddingLeft: 15,
    color: '#4d4d4d'
  },
  listContainerStyle: {
    borderColor: '#e5e3e3',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1
  },
  heading: {
    justifyContent: 'center',
    marginBottom: 10
  },
  headingText: {
    color: '#848484',
    fontSize: 22,
    textAlign: 'center'
  },
  subHeadingText: {
    color: '#848484',
    fontSize: 18,
    textAlign: 'center'
  },
  cancel: {
    marginLeft: 10,
    backgroundColor: '#bdc3c7'
  }
})

export default styles
