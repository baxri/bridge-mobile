import React from 'react'
import Field from './Field'
import { FLOWS } from 'app/shared/constants'

export default function Form({
  connectorEmail,
  flow = null,
  fromContact,
  toContact,
  loading,
  message,
  subject,
  onMessageChange,
  onSubjectChange,
  messageContentHeight = null,
  onMessageTouch = null,
  onMessageContentSizeChange = null
}) {
  return (
    <React.Fragment>
      <Field
        label="From"
        value={connectorEmail}
        disabled={true}
        editable={false}
      />
      <Field
        label="To"
        value={
          !!flow
            ? flow === FLOWS.FORWARDABLE
              ? fromContact.name
              : `${fromContact.name}, ${toContact.name}`
            : toContact.email
        }
        disabled={true}
        editable={false}
      />
      <Field
        label="Subject"
        disabled={loading}
        value={subject}
        onChangeText={onSubjectChange}
      />
      <Field
        disabled={loading}
        multiline={true}
        borderBottom={false}
        flex={true}
        value={message}
        onChange={({ nativeEvent: { text, target } }) =>
          onMessageChange(text, target)
        }
        inputStyle={{ height: messageContentHeight }}
        onTouchStart={onMessageTouch}
        onContentSizeChange={onMessageContentSizeChange}
      />
    </React.Fragment>
  )
}
