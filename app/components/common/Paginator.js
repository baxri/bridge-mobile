import React from 'react'
import PropTypes from 'prop-types'
import connectPaginator from '../../containers/shared/Paginator/connectPaginator'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '../common/Text'

class Paginator extends React.Component {
  handlePress = page => {
    return this.props.paginator.goToPage(page)
  }

  prevPage = () => {
    const { paginator } = this.props
    const { pages, page, goToPage } = paginator
    if (!~pages.indexOf(page - 1)) return
    return paginator.goToPage(page - 1)
  }

  nextPage = () => {
    const { paginator } = this.props
    const { pages, page, goToPage } = paginator
    if (!~pages.indexOf(page + 1)) return
    return paginator.goToPage(page + 1)
  }

  render() {
    const { paginator, location } = this.props

    if (!paginator || paginator.pages.length <= 1) {
      return null
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={this.prevPage}
        >
          <Text>&laquo;</Text>
        </TouchableOpacity>
        {paginator.pages.map(page => {
          const textStyles = [styles.text]
          const btnStyles = [styles.button]
          if (page === paginator.page) {
            textStyles.push(styles['text-active'])
            btnStyles.push(styles['btn-active'])
          }

          return (
            <TouchableOpacity
              style={btnStyles}
              key={page}
              onPress={this.handlePress.bind(this, page)}
            >
              <Text style={textStyles}>{page}</Text>
            </TouchableOpacity>
          )
        })}
        <TouchableOpacity
          style={[styles.button, styles.nextButton]}
          onPress={this.nextPage}
        >
          <Text>&raquo;</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0
  },
  prevButton: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderRightWidth: 0
  },
  nextButton: {
    borderRightWidth: 1,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4
  },
  button: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRightWidth: 0
  },
  'btn-active': {
    backgroundColor: '#337ab7'
  },
  'text-active': {
    color: 'white'
  },
  text: {
    color: '#337ab7'
  }
})

export default connectPaginator(Paginator)
