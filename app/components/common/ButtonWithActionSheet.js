import React from 'react'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { Button } from './Button'
import Icon from 'react-native-vector-icons/FontAwesome'
import PropTypes from 'prop-types'

class ButtonWithActionSheet extends React.Component {
  constructor(props) {
    super(props)

    this.handlePress.bind(this)
  }

  handlePress() {
    const { actionSheetProps, onSelect } = this.props
    this.props.showActionSheetWithOptions(actionSheetProps, onSelect)
    return this.props.onPress.apply(this, arguments)
  }

  render() {
    const { children, btnSize } = this.props

    return (
      <Button {...this.props} onPress={this.handlePress}>
        {children}{' '}
        <Icon
          name="caret-down"
          color="white"
          size={styles.icon[btnSize].size}
        />
      </Button>
    )
  }
}

ButtonWithActionSheet.defaultProps = {
  onPress() {},
  btnSize: 'default'
}

ButtonWithActionSheet.propTypes = {
  btnSize: PropTypes.oneOf(['default', 'small'])
}

ButtonWithActionSheet = connectActionSheet(ButtonWithActionSheet)

const styles = {
  icon: {
    default: {
      size: 16
    },
    small: {
      size: 12
    }
  }
}

export { ButtonWithActionSheet }
