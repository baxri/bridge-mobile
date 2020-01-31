import React, { useState } from 'react'
import { storiesOf } from '@storybook/react-native'
import { SafeAreaDecorator } from '../decorators'
import { View, Text } from 'react-native'

import { Images } from 'app/themes'
import {
  ActionSheet,
  Spacer,
  Filter,
  Button,
  TextInput
} from 'app/components-v2/common'

/* START INTRO FILTER */
const introsList = [
  { label: 'All', muted: '308', icon: Images.filter.all },
  { label: 'Received', muted: '3', icon: Images.filter.received },
  { label: 'Active', muted: '4', icon: Images.filter.active },
  { label: 'To do', muted: '10', icon: Images.filter.confirm },
  { label: 'No Reply', muted: '298', icon: Images.filter.noreply },
  { label: 'Done', muted: '2091', icon: Images.filter.completed },
  { label: 'Rated', muted: '102', icon: Images.filter.rated },
  { label: 'Declined', muted: '21', icon: Images.filter.declined },
  { label: 'Archived', muted: '12', icon: Images.filter.archived }
]

const IntroFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeFilter = introsList[activeIndex]
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <Spacer>
        <Filter
          title={activeIndex ? activeFilter.label : 'Intros'}
          count={activeFilter.muted}
          onPress={() => setIsOpen(true)}
        />
      </Spacer>

      <ActionSheet.Container
        header="Filters"
        headerPosition="left"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <View>
          {introsList.map((item, index) => (
            <ActionSheet.Filter
              key={index}
              index={index}
              active={index === activeIndex}
              onChange={setActiveIndex}
              {...item}
            />
          ))}
        </View>
      </ActionSheet.Container>
    </View>
  )
}
/* END INTRO FILTER */

/* START CONTACT FILTER */
const contactList = [
  { label: 'All', muted: '308', icon: Images.filter.all },
  { label: 'Recent', muted: '308', icon: Images.filter.recent },
  { label: 'Frequent', muted: '308', icon: Images.filter.frequent }
]

const ContactFilter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeFilter = contactList[activeIndex]
  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <Spacer>
        <Filter
          title={activeIndex ? activeFilter.label : 'Contacts'}
          count={activeFilter.muted}
          onPress={() => setIsOpen(true)}
        />
      </Spacer>

      <ActionSheet.Container
        header="Filters"
        headerPosition="left"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        {contactList.map((item, index) => (
          <ActionSheet.Filter
            key={index}
            index={index}
            active={index === activeIndex}
            onChange={setActiveIndex}
            {...item}
          />
        ))}
      </ActionSheet.Container>
    </View>
  )
}
/* END CONTACT FILTER */

/* START FORM ACTIONSHEET */
const FormActionSheet = () => {
  const [isOpen, setIsOpen] = useState(true)

  const header = (
    <ActionSheet.Header
      title="New Contact"
      actionRight={{
        title: 'Save',
        onPress: () => console.log('save')
      }}
      actionLeft={{
        title: 'Cancel',
        onPress: () => setIsOpen(false)
      }}
    />
  )

  return (
    <View
      style={{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        padding: 20
      }}
    >
      <Button onPress={() => setIsOpen(true)} text="Open ActionSheet Form" />

      <ActionSheet.Container
        header={header}
        headerPosition="center"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Spacer>
          <TextInput />
        </Spacer>
      </ActionSheet.Container>
    </View>
  )
}
/* END FORM ACTIONSHEET */

storiesOf('ActionSheet', module)
  .addDecorator(SafeAreaDecorator)
  // .add('Default', () => <DefaultActionSheet />)
  .add('Intro Filters', () => <IntroFilter />)
  .add('Contact Filter', () => <ContactFilter />)
  .add('Form', () => <FormActionSheet />)
