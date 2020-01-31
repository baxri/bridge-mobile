import React from 'react'
import { storiesOf } from '@storybook/react-native'

import { Spacer, FooterContact as Contact } from 'app/components-v2/common'

import { CenterDecorator } from '../../decorators'

storiesOf('Create Intro v3', module)
  .addDecorator(CenterDecorator)
  .add('Contact button', () => {
    return (
      <Spacer>
        <Contact contact={{ name: 'Lida N.' }} />
      </Spacer>
    )
  })
  .add('Contact button with avatar', () => {
    return (
      <Spacer>
        <Contact
          contact={{ name: 'Lida N.', src: 'http://bibi.ge/static/img/me.jpg' }}
        />
      </Spacer>
    )
  })
  .add('Contact button with warning', () => {
    return (
      <Spacer>
        <Contact
          contact={{
            name: 'Lida N.',
            src: 'http://bibi.ge/static/img/me.jpg',
            linkedinState: {
              valid: false,
              showWarning: true
            }
          }}
        />
      </Spacer>
    )
  })
