import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { SafeAreaDecorator } from '../decorators'
import { SearchBar } from 'app/components-v2/common'

storiesOf('SearchBar', module)
  .addDecorator(SafeAreaDecorator)
  .add('Default', () => <SearchBar title="Search" updateSearch={() => {}} />)
