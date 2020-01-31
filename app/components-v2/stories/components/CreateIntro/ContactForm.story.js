import React, { PureComponent } from 'react'
import { storiesOf } from '@storybook/react-native'
import { View } from 'react-native'

import Decorator, { SafeAreaDecorator } from '../../decorators'

import { Button, ContactEditor } from 'app/components-v2/common'

class ContactFormStory extends PureComponent {
  state = {
    show: false,
    contact: {
      name: '',
      email: ''
    }
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
        <ContactEditor
          isOpen={this.state.show}
          onClose={this.onClose}
          contact={this.state.contact}
        />
      </View>
    )
  }
}

storiesOf('Create Intro v3', module)
  .addDecorator(Decorator)
  .addDecorator(SafeAreaDecorator)
  .add('Contact form', () => <ContactFormStory />)
