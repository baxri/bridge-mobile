import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import Decorator from '../decorators'

import { Spacer } from 'app/components-v2/common'
import Intro from 'app/components-v2/common/intro'

const intro = {
  id: 1,
  created_at: new Date().toUTCString(),
  updated_at: new Date().toUTCString(),
  my_role: 'broker',
  broker: 'Joe Bloggs',
  from: 'Jane Smith',
  from_email: 'jane.smith@gmail.com',
  from_profile_pic_url: 'https://randomuser.me/api/portraits/women/67.jpg',
  to: 'Shawn Thomas',
  to_email: 'shawn.thomas@gmail.com',
  to_profile_pic_url: 'https://randomuser.me/api/portraits/men/19.jpg'
}

const intro2 = {
  id: 2,
  created_at: new Date().toUTCString(),
  updated_at: new Date().toUTCString(),
  my_role: 'broker',
  broker: 'Joe Bloggs',
  from: 'Jenny Banks',
  from_email: 'jenny.banks@gmail.com',
  from_profile_pic_url: 'https://randomuser.me/api/portraits/women/96.jpg',
  to: 'Barry Rhodes',
  to_email: 'barry.rhodes@gmail.com',
  to_profile_pic_url: 'https://randomuser.me/api/portraits/men/17.jpg'
}

const introRatedGreatByN1 = { ...intro, rating: 'great' }

const introRatedGreatByN2 = { ...intro, to_rating: 'great' }

const introRatedGreatByN1AndN2 = {
  ...intro,
  rating: 'great',
  to_rating: 'great'
}

const introRatedGoodByN1 = { ...intro, rating: 'okay' }

const introRatedGoodByN2 = { ...intro, to_rating: 'okay' }

const introRatedGoodByN1AndN2 = { ...intro, rating: 'okay', to_rating: 'okay' }

const introRatedNotGoodByN1 = { ...intro, rating: 'not_good' }

const introRatedNotGoodByN2 = { ...intro, to_rating: 'not_good' }

const introRatedNotGoodByN1AndN2 = {
  ...intro,
  rating: 'not_good',
  to_rating: 'not_good'
}

const introRatedWithMessages1 = {
  ...intro,
  rating: 'great',
  to_rating: 'okay',
  rating_message: 'Awesome intro, thank you so much!',
  to_rating_message:
    'Jane is a great person and I look forward to working with her, thank you!'
}

const introRatedWithMessages2 = {
  ...intro,
  rating: 'okay',
  to_rating: 'not_good',
  rating_message: 'It went okay but not sure if Shawn like me.',
  to_rating_message: 'Jane isn`t the right candidate I`m afraid'
}

storiesOf('Intro', module)
  .addDecorator(Decorator)
  .add('Initialized', () => (
    <View>
      <Intro {...intro} status={'initialized'} />
      <Spacer small />
      <Intro {...intro} my_role={'n1'} status={'initialized'} />
      <Spacer small />
      <Intro {...intro} my_role={'n2'} status={'initialized'} />
    </View>
  ))
  .add('Accepted by N1', () => (
    <View>
      <Intro {...intro} status={'confirmed'} />
      <Spacer small />
      <Intro {...intro} my_role={'n1'} status={'confirmed'} />
      <Spacer small />
      <Intro {...intro} my_role={'n2'} status={'confirmed'} />
    </View>
  ))
  .add('Declined by N1', () => (
    <View>
      <Intro {...intro} status={'canceled'} />
      <Spacer small />
      <Intro {...intro} my_role={'n1'} status={'canceled'} />
      <Spacer small />
      <Intro {...intro} my_role={'n2'} status={'canceled'} />
    </View>
  ))
  .add('Forwarded to N2', () => (
    <View>
      <Intro {...intro} status={'published'} />
      <Spacer small />
      <Intro {...intro} my_role={'n1'} status={'published'} />
      <Spacer small />
      <Intro {...intro} my_role={'n2'} status={'published'} />
    </View>
  ))
  .add('Declined By N2', () => (
    <View>
      <Intro {...intro} status={'rejected'} />
      <Spacer small />
      <Intro {...intro} my_role={'n1'} status={'rejected'} />
      <Spacer small />
      <Intro {...intro} my_role={'n2'} status={'rejected'} />
    </View>
  ))
  .add('Completed', () => (
    <View>
      <Intro {...intro} status={'accepted'} />
      <Spacer small />
      <Intro {...intro} my_role={'n1'} status={'accepted'} />
      <Spacer small />
      <Intro {...intro} my_role={'n2'} status={'accepted'} />
    </View>
  ))
  .add('Declined by Connector', () => (
    <View>
      <Intro {...intro} status={'canceled_by_owner'} />
      <Spacer small />
      <Intro {...intro} my_role={'n1'} status={'canceled_by_owner'} />
      <Spacer small />
      <Intro {...intro} my_role={'n2'} status={'canceled_by_owner'} />
    </View>
  ))
  .add('Rated Great', () => (
    <View>
      <Intro {...introRatedGreatByN1} status={'accepted'} />
      <Spacer small />
      <Intro {...introRatedGreatByN2} status={'accepted'} />
      <Spacer small />
      <Intro {...introRatedGreatByN1AndN2} status={'accepted'} />
    </View>
  ))
  .add('Rated Good', () => (
    <View>
      <Intro {...introRatedGoodByN1} status={'accepted'} />
      <Spacer small />
      <Intro {...introRatedGoodByN2} status={'accepted'} />
      <Spacer small />
      <Intro {...introRatedGoodByN1AndN2} status={'accepted'} />
    </View>
  ))
  .add('Rated Not Good', () => (
    <View>
      <Intro {...introRatedNotGoodByN1} status={'accepted'} />
      <Spacer small />
      <Intro {...introRatedNotGoodByN2} status={'accepted'} />
      <Spacer small />
      <Intro {...introRatedNotGoodByN1AndN2} status={'accepted'} />
    </View>
  ))
  .add('Rated with Messages', () => (
    <View>
      <Intro {...introRatedWithMessages1} status={'accepted'} />
      <Spacer small />
      <Intro {...introRatedWithMessages2} status={'accepted'} />
    </View>
  ))
  .add('Full', () => (
    <Intro full {...introRatedGreatByN1} status={'accepted'} />
  ))
  .add('Full with no Header or Footer', () => (
    <Intro
      full
      showHeader={false}
      showFooter={false}
      {...introRatedGreatByN1}
      status={'accepted'}
    />
  ))
  .add('List', () => (
    <View>
      <Intro {...intro2} status={'initialized'} />
      <Spacer small />
      <Intro {...intro} status={'accepted'} />
    </View>
  ))
