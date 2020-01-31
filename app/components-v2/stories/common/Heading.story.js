import React from 'react'
import { storiesOf } from '@storybook/react-native'

import Heading from 'app/components-v2/common/heading'

storiesOf('Heading', module).add('Default', () => <Heading title="Contacts" />)
