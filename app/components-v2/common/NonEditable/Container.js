import React, { PureComponent } from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

import { Images } from 'app/themes'
import { Spacer } from 'app/components-v2/common'
import { deviceWidth } from 'app/utils/platform'
import Tooltip from '../Tooltip/Tooltip'
import styles from './styles'

class Container extends PureComponent {
  static propTypes = {
    tooltipText: PropTypes.string,
    showTooltip: PropTypes.bool
  }

  static defaultProps = {
    showTooltip: true
  }

  initPosition = {
    top: 0,
    left: 0
  }

  initSize = {
    width: 0,
    height: 0
  }

  state = {
    tooltipPosition: this.initPosition,
    tooltipSize: this.initSize,
    tooltipVisible: false
  }

  toggleTooltip = e => {
    const { tooltipSize, tooltipVisible } = this.state

    this.setState({ tooltipVisible: !tooltipVisible })

    const { locationY, locationX } = e.nativeEvent
    let newTop = locationY - tooltipSize.height - 6
    let newLeft = locationX - tooltipSize.width / 2

    if (newTop < 0) {
      newTop = 0
    }

    if (newLeft < 0) {
      newLeft = 8
    }

    if (newLeft + tooltipSize.width > deviceWidth) {
      newLeft = deviceWidth / 2 - (tooltipSize.width - deviceWidth / 2) - 8
    }

    this.setState({
      tooltipPosition: {
        ...this.initPosition,
        top: newTop,
        left: newLeft
      }
    })
  }

  handleTooltipLayout = e => {
    const { layout } = e.nativeEvent

    this.setState({
      tooltipSize: {
        ...this.state.tooltipSize,
        width: layout.width,
        height: layout.height
      }
    })
  }

  hideTooltip = () => this.setState({ tooltipVisible: false })

  render() {
    const { showTooltip, tooltipText, children } = this.props
    const { tooltipPosition, tooltipVisible } = this.state

    return (
      <TouchableWithoutFeedback onPress={showTooltip && this.toggleTooltip}>
        <View pointerEvents="auto" style={styles.container}>
          <View style={styles.container} pointerEvents="none">
            <View style={styles.lockIcon}>
              <Image source={Images.icons.lockContent} />
            </View>
            <Spacer>
              {showTooltip && (
                <Tooltip
                  tooltipVisible={tooltipVisible}
                  onLayout={this.handleTooltipLayout}
                  text={tooltipText}
                  containerStyle={{
                    ...styles.tooltip,
                    top: tooltipPosition.top,
                    left: tooltipPosition.left
                  }}
                />
              )}
              {children}
            </Spacer>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default Container
