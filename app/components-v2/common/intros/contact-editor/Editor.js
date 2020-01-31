import React, { PureComponent } from 'react'
import { Alert, Keyboard } from 'react-native'

import {
  ActionSheet,
  Spacer,
  FlashMessage,
  showMessage,
  hideMessage
} from 'app/components-v2/common'
import ContactForm from './Form'

class ContactEditor extends PureComponent {
  formRef = React.createRef()
  state = {
    formValid: false,
    isSubmitting: false
  }

  componentDidUpdate(prevProps) {
    const { email, name } = this.props.contact
    if (!!email && !name) {
      if (this.formRef.current) {
        this.formRef.current.setFieldTouched('name', true, true)
      }
    }

    if (!prevProps.isOpen && this.props.isOpen) {
      this.setState({ isSubmitting: false })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout)
  }

  onSavePress = () => this.formRef.current.submitForm()

  renderHeader = () => (
    <ActionSheet.Header
      title={this.props.isEditContact ? 'Edit Contact' : 'New Contact'}
      actionRight={{
        title: 'Save',
        onPress: this.onSavePress,
        disabled: this.state.isSubmitting || !this.state.formValid
      }}
    />
  )

  onFormChange = formProps => {
    if (this.state.formValid !== formProps.isValid) {
      this.setState({ formValid: formProps.isValid })
    }

    this.values = formProps.values
    this.formDirty = formProps.dirty
  }

  onSuccess = newContact => {
    if (this.props.onContactSaved) {
      this.props.onContactSaved(newContact, this.props.selector)
    }

    this.close()
  }

  showAlert = () => {
    Alert.alert(this.alertMessage(), '', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          this.onSuccess(this.props.contact)
        }
      }
    ])
  }

  onClose = () => {
    if (this.props.isEditContact) {
      if (this.formDirty) {
        this.showAlert()
      } else {
        this.close()
      }
    } else if (!!this.values.name || !!this.values.email) {
      this.showAlert()
    } else {
      this.close()
    }
  }

  onCloseConfirmation = () => {
    if (!this.formDirty) {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      const cancel = {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {
          reject()
        }
      }
      const ok = {
        text: 'OK',
        onPress: () => {
          this.onSuccess(this.props.contact)
          resolve()
        }
      }
      if (!this.state.isSubmitting)
        Alert.alert(this.alertMessage(), '', [cancel, ok])
    })
  }

  alertMessage = () => {
    return this.props.contact.id ? 'Discard changes?' : 'Discard contact?'
  }

  close = () => {
    Keyboard.dismiss()

    this.timeout = setTimeout(() => {
      this.props.onClose()
    }, 50)
  }

  onFailed = ({ error }) => {
    this.setState({ isSubmitting: false })

    if (!!error) {
      const email = error.errors.email
      if (!!email && email.length > 0) {
        showMessage({ message: `Email ${email[0]}` })
      } else {
        showMessage({ message: 'Cannot create contact. Please try again.' })
      }
    }
  }

  handleFormSubmit = values => {
    hideMessage()
    this.setState({ isSubmitting: true })

    const { isEditContact, createContact, updateContact, contact } = this.props

    if (isEditContact) {
      updateContact({ contact: { ...contact, ...values } }, true)
        .then(resp => this.onSuccess({ ...resp.data.contact, isValid: true }))
        .catch(err => this.onFailed(err.payload))
    } else {
      createContact({ contact: { ...values } }, true)
        .then(resp => this.onSuccess({ ...resp.data.contact, isValid: true }))
        .catch(err => this.onFailed(err.payload))
    }
  }

  render() {
    const { isOpen, contact } = this.props
    return (
      <ActionSheet.Container
        isOpen={isOpen}
        header={this.renderHeader()}
        onClose={this.state.isSubmitting ? () => {} : this.close}
        closeConfirmation={
          this.state.isSubmitting ? null : this.onCloseConfirmation
        }
      >
        <FlashMessage />
        <Spacer left={2} right={2} top={2} bottom={6}>
          <ContactForm
            ref={this.formRef}
            contact={contact}
            onFormStateChange={this.onFormChange}
            handleFormSubmit={this.handleFormSubmit}
          />
        </Spacer>
      </ActionSheet.Container>
    )
  }
}

export default ContactEditor
