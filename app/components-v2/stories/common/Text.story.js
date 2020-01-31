import React from 'react'
import { View } from 'react-native'
import { storiesOf } from '@storybook/react-native'
import { CenterDecorator } from '../decorators'
import DisplayText from 'app/components-v2/common/text/display'
import HeadingText from 'app/components-v2/common/text/heading'
import SubtitleText from 'app/components-v2/common/text/subtitle'
import BodyText from 'app/components-v2/common/text/body'
import CaptionText from 'app/components-v2/common/text/body'
import OverlineText from 'app/components-v2/common/text/overline'

storiesOf('Text', module)
  .addDecorator(CenterDecorator)
  .add('Display', () => (
    <View>
      <DisplayText text="Display 2 (48 B)" version={2} />
      <DisplayText text="Display 1 (34 B)" version={1} />
      <DisplayText
        style={{ width: 300 }}
        text="Long Long Display 1 (34 B)"
        version={1}
        numberOfLines={1}
      />
    </View>
  ))
  .add('Heading', () => (
    <View>
      <HeadingText text="Heading 1 (28 B)" version={1} />
      <HeadingText text="Heading 2 (18 B)" version={2} />
      <HeadingText text="Heading 3 (16 B)" version={3} />
      <HeadingText
        style={{ width: 300 }}
        text="Long Long Long Long Long Heading 3 (16 B)"
        version={3}
        numberOfLines={1}
      />
    </View>
  ))
  .add('Subtitle', () => (
    <View>
      <SubtitleText text="Subtitle 1 (16)" version={1} />
      <SubtitleText text="Subtitle 2 (14)" version={2} />
      <SubtitleText
        style={{ width: 300 }}
        text="Long Long Long Long Long Long Subtitle 2 (14)"
        version={2}
        numberOfLines={1}
      />
    </View>
  ))
  .add('Body', () => (
    <View>
      <BodyText text="Body 1 (16)" version={1} />
      <BodyText text="Body 1 (16) bold" version={1} bold={true} />
      <BodyText text="Body 2 (14)" version={2} />
      <BodyText text="Body 2 (14) bold" version={2} bold={true} />
      <BodyText
        style={{ width: 300 }}
        text="Long Long Long Long Long Long Body 2 (14)"
        version={2}
        numberOfLines={1}
      />
    </View>
  ))
  .add('Caption', () => (
    <View>
      <CaptionText text="Caption 12" />
      <CaptionText
        style={{ width: 300 }}
        text="Long Long Long Long Long Long Caption 12"
        numberOfLines={1}
      />
    </View>
  ))
  .add('Overline', () => (
    <View>
      <OverlineText text="OVERLINE (10 SB)" />
      <OverlineText
        style={{ width: 300 }}
        text="Long Long Long Long Long Long OVERLINE (10 SB)"
        numberOfLines={1}
      />
    </View>
  ))
