import React from 'react'
import { ActionSheet } from 'app/components-v2/common'

import FlowItem from './FlowItem'
import extractFirstName from 'app/utils/extractFirstName'
import { FLOWS } from 'app/shared/constants'

const getNameForCaption = (contact, defaultName) =>
  extractFirstName(contact.name) || defaultName

const FlowSelector = ({
  isOpen,
  selectedFlow,
  onSelectFlow,
  onClose,
  fromContact,
  toContact
}) => {
  const fromName = getNameForCaption(fromContact, 'Person 1')
  const toName = getNameForCaption(toContact, 'Person 2')

  return (
    <ActionSheet.Container
      isOpen={isOpen}
      header="Intro Type"
      onClose={onClose}
    >
      <FlowItem
        label="Request Forwardable"
        caption={`${fromName} will be asked to provide you more information and context that you can send ${toName} to opt-in`}
        selected={selectedFlow === FLOWS.FORWARDABLE}
        onPress={() => onSelectFlow(FLOWS.FORWARDABLE)}
      />
      <FlowItem
        label="No Opt-in"
        caption={`${fromName} and ${toName} will be introduced immediately with no opt-ins requested`}
        selected={selectedFlow === FLOWS.NO_OPT_IN}
        onPress={() => onSelectFlow(FLOWS.NO_OPT_IN)}
      />
    </ActionSheet.Container>
  )
}

export default FlowSelector
