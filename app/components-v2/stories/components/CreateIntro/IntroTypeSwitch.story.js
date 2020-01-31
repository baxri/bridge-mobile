import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'

import Decorator, { SafeAreaDecorator } from '../../decorators'

import FlowSelector from 'app/components-v2/intros/create-v3/components/FlowSelector'
import { Button } from 'app/components-v2/common'
import { INITIAL_CONTACT } from 'app/shared/constants'

class FlowSelectorStory extends PureComponent {
  state = {
    show: false
  }

  onClose = () => this.setState({ show: false })

  render() {
    return (
      <View>
        <Button
          transparent
          text="Click to open"
          onPress={() => this.setState({ show: true })}
        />
        <FlowSelector
          isOpen={this.state.show}
          onClose={this.onClose}
          onSelectFlow={this.onClose}
          selectedFlow="fast"
          fromContact={INITIAL_CONTACT}
          toContact={INITIAL_CONTACT}
        />
      </View>
    )
  }
}

storiesOf('Create Intro v3', module)
  .addDecorator(Decorator)
  .addDecorator(SafeAreaDecorator)
  .add('Intro type switching', () => <FlowSelectorStory />)
