import React, { Component } from 'react'
import { ScrollView, Text, View, Alert, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Field, reduxForm } from 'redux-form'
import Config from 'react-native-config'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'

import Mixpanel from 'app/utils/mixpanel'
import snackbar from 'app/utils/snackbar'
import {
  Header,
  Input,
  Spinner,
  Button,
  Message,
  Avatar,
  EmailSignatureSheet,
  IosKeyboardSpacer
} from '../common'
import GmailAccountsTable from '../../containers/profile/GmailAccountsTable'

import s from './Styles'

const CLOUDINARY_NAME = Config.CLOUDINARY_NAME
const CLOUDINARY_PRESET = Config.CLOUDINARY_PRESET

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedImage: null,
      isOpen: false
    }
  }

  componentDidMount() {
    const { clearState, fetchUser, userId } = this.props

    clearState()
    fetchUser(userId)
  }

  UNSAFE_componentWillReceiveProps({ fetchLoading, user, deleted, message }) {
    if (!fetchLoading && this.props.fetchLoading) {
      this.props.initialize(user)
    }
    if (!fetchLoading && deleted) {
      Actions.recover()
    }
    if (message) {
      snackbar(message)
    }
  }

  handleFormSubmit = values => {
    // Just send data thats we want to update
    const data = {
      first_name: values.first_name,
      last_name: values.last_name
    }

    this.props.updateUser(this.props.user.id, data)
  }

  changeProfilePicture = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
        cameraRoll: true
      },
      allowsEditing: true,
      cameraType: 'front',
      maxWidth: 100,
      maxHeight: 100,
      quality: 0.7
    }

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // User cancelled image picker
      } else if (response.error) {
        // response.error
      } else if (response.customButton) {
        // response.customButton
      } else {
        this.setState({
          selectedImage: response.uri
        })

        this.uploadFile(response)
          .then(response => response.json())
          .then(result => {
            this.props.updateUser(this.props.user.id, {
              profile_pic_url: result.secure_url,
              pic_type: 'uploaded'
            })
          })
          .catch(() => {})
      }
    })
  }

  uploadFile = file => {
    let data = null

    if (file.origURL) {
      data = RNFetchBlob.wrap(file.origURL)
    } else {
      data = `data:image/jpg;base64,${file.data}`
    }

    return RNFetchBlob.fetch(
      'POST',
      'https://api.cloudinary.com/v1_1/' +
        CLOUDINARY_NAME +
        '/image/upload?upload_preset=' +
        CLOUDINARY_PRESET,
      {
        'Content-Type': 'multipart/form-data'
      },
      [
        {
          name: 'file',
          filename: file.fileName,
          data: data
        }
      ]
    )
  }

  handleCancel() {
    Actions.home()
  }

  handleDelete = () =>
    Alert.alert('Are you sure?', '', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'OK',
        onPress: () => this.props.softDeleteAccount(this.props.user.id)
      }
    ])

  handleLogout = () => {
    this.props.logoutUser()
    Mixpanel.reset()
    Actions.auth({ type: 'reset' })
  }

  render() {
    const {
      user,
      fetchLoading,
      updateLoading,
      clearState,
      errorMessage,
      handleSubmit
    } = this.props
    const { selectedImage } = this.state

    return (
      <View style={s.container}>
        <Header
          title={'Profile'}
          onBack={() => {
            Actions.pop()
          }}
          backLabel="Back"
          onAction={this.handleLogout}
          actionTitle="Logout"
          style={{ paddingHorizontal: 16 }}
        />
        {fetchLoading ? (
          <Spinner />
        ) : (
          <View>
            <ScrollView style={s.scroll}>
              <View style={s.form}>
                <View style={[s.centered, { marginTop: 8 }]}>
                  <TouchableOpacity onPress={this.changeProfilePicture}>
                    <Avatar
                      src={selectedImage ? selectedImage : user.profile_pic_url}
                      name={user.first_name}
                      email={user.email}
                      size={84}
                      fontSize={34}
                    />
                  </TouchableOpacity>
                  <Text style={s.title}>Hi {user.first_name}</Text>
                </View>
                <View>
                  <Field
                    testID="profileFirstNameField"
                    name="first_name"
                    label="First name"
                    component={Input}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
                <View>
                  <Field
                    testID="profileLastNameField"
                    name="last_name"
                    label="Last name"
                    component={Input}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
                <View>
                  <View style={s.buttons}>
                    <Button
                      disabled={updateLoading}
                      style={s.save_button}
                      onPress={handleSubmit(this.handleFormSubmit)}
                      text="Save"
                    />
                    <Button
                      secondary
                      disabled={updateLoading}
                      style={s.cancel_profile}
                      onPress={this.handleCancel}
                      text="Cancel"
                    />
                  </View>
                  <View style={s.buttons}>
                    <Button
                      alt
                      danger
                      disabled={updateLoading}
                      style={s.delete_button}
                      onPress={this.handleDelete}
                      text="Delete Account"
                    />
                  </View>
                </View>
                <GmailAccountsTable />
              </View>
              <IosKeyboardSpacer />
            </ScrollView>
            {errorMessage ? (
              <View>
                <Message
                  onClose={clearState}
                  error={true}
                  text={errorMessage}
                />
              </View>
            ) : null}
          </View>
        )}
        <EmailSignatureSheet
          isOpen={this.state.isOpen}
          onClose={() => this.setState({ isOpen: false })}
          signature={
            this.props.user.default_email_signature ||
            `Best, \n${this.props.user.first_name}`
          }
          onSavePress={signature => {
            this.props.updateUser(this.props.user.id, {
              default_email_signature: signature
            })
            this.setState({ isOpen: false })
          }}
        />
      </View>
    )
  }
}

const validate = props => {
  const errors = {}
  const fields = [['first_name', 'First name'], ['last_name', 'Last name']]
  fields.forEach(([name, label]) => {
    if (!props[name]) {
      errors[name] = `${label} is required`
    }
  })
  return errors
}

export default reduxForm({
  form: 'profile',
  destroyOnUnmount: false, // TODO See https://github.com/erikras/redux-form/issues/4152
  validate
})(Profile)
