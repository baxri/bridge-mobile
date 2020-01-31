import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { Spacer, SendIntroFormField as Field } from 'app/components-v2/common'

import { CenterDecorator } from '../../decorators'

storiesOf('Create Intro v3', module)
  .addDecorator(CenterDecorator)
  .add('Send screen field (disabled)', () => {
    return (
      <Spacer>
        <Field
          label="From"
          value="connor.murphy@techstars.com"
          disabled={true}
          autoFocus={true}
        />
      </Spacer>
    )
  })
  .add('Send screen field (editable)', () => {
    return (
      <Spacer>
        <Field
          label="Subject"
          value="Intro to Mike Trevno"
          disabled={false}
          autoFocus={true}
        />
      </Spacer>
    )
  })
  .add('Send screen field (multiline)', () => {
    return (
      <Spacer>
        <View style={{ height: 100, width: '100%' }}>
          <Field
            autoFocus={true}
            value={`Hi Linda, Just confirming you want an introduction to Mike Trevno?`}
            disabled={false}
            multiline={true}
          />
        </View>
      </Spacer>
    )
  })
