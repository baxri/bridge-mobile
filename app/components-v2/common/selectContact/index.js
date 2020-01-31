import React, { Component } from 'react'

import { Form, ContactInput } from 'app/components-v2/common'

class SelectContact extends Component {
  onFocusFrom = () => {
    this.props.updateState({ query: this.props.fromValue })
  }

  onChangeFrom = value => {
    this.props.updateState({ fromValue: value, query: value })
  }

  onSubmitEditingFrom = () => {
    if (this.toContactInput && this.toContactInput.textInput) {
      this.toContactInput.textInput.focus()
    } else {
      Keyboard.dismiss()
    }
    this.props.updateState({ fromEditable: false })
  }

  onDeleteFrom = () => {
    this.props.updateState(
      {
        fromValue: null,
        fromContact: null,
        fromEditable: true
      },
      () => {
        if (this.fromContactInput && this.fromContactInput.textInput) {
          this.fromContactInput.textInput.focus()
        }
      }
    )
  }

  onFocusTo = () => {
    this.props.updateState({ query: this.props.toValue })
  }

  onChangeTo = value => {
    this.props.updateState({ toValue: value, query: value })
  }

  onSubmitEditingTo = () => {
    if (this.fromContactInput && this.fromContactInput.textInput) {
      this.fromContactInput.textInput.focus()
    } else {
      Keyboard.dismiss()
    }
    this.props.updateState({ toEditable: false })
  }

  onDeleteTo = () => {
    this.props.updateState(
      {
        toValue: null,
        toContact: null,
        toEditable: true
      },
      () => {
        if (this.toContactInput && this.toContactInput.textInput) {
          this.toContactInput.textInput.focus()
        }
      }
    )
  }

  render() {
    const {
      fromValue,
      fromEditable,
      fromContact,
      setFromRef,
      toValue,
      toEditable,
      toContact,
      setToRef,
      onCancel,
      nextScreen
    } = this.props

    return (
      <Form
        title="Create Intro"
        button="Continue"
        onCancel={onCancel}
        onPress={nextScreen}
        hideButton={!fromValue || !toValue}
      >
        <ContactInput
          ref={ref => {
            this.fromContactInput = ref
            setFromRef(ref)
          }}
          name="from"
          label=""
          value={fromValue}
          contact={fromContact}
          editable={fromEditable}
          autoFocus
          placeholder={'I want to introduce...'}
          onFocus={this.onFocusFrom}
          onChange={this.onChangeFrom}
          onSubmitEditing={this.onSubmitEditingFrom}
          onDelete={this.onDeleteFrom}
        />
        {fromValue ? (
          <ContactInput
            ref={ref => {
              this.toContactInput = ref
              setToRef(ref)
            }}
            name="to"
            label=""
            value={toValue}
            contact={toContact}
            editable={toEditable}
            placeholder="Enter a name or email"
            editable={toEditable}
            onFocus={this.onFocusTo}
            onChange={this.onChangeTo}
            onSubmitEditing={this.onSubmitEditingTo}
            onDelete={this.onDeleteTo}
          />
        ) : null}
      </Form>
    )
  }
}

export default SelectContact
