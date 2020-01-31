import React, { PureComponent } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActionSheetIOS,
  Alert
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'
import Config from 'react-native-config'

import {
  Header,
  Avatar,
  HeadingText,
  Spacer,
  Spinner,
  EmailSignatureSheet,
  Button
} from 'app/components-v2/common'
import { Styles, Images, Metrics, Colors } from 'app/themes'
import { isIOS } from 'app/utils/platform'
import { getUserPrimaryEmail } from 'app/utils/users'
import snackbar from 'app/utils/snackbar'

import GmailConnectButton from './components/ConnectButton'
import PrimaryAccount from './components/PrimaryAccount'
import AccountsList from './components/google-accounts/AccountsList'

const CLOUDINARY_NAME = Config.CLOUDINARY_NAME
const CLOUDINARY_PRESET = Config.CLOUDINARY_PRESET

class UserProfile extends PureComponent {
  state = {
    selectedImage: null,
    isOpen: false
  }

  componentDidMount() {
    const { clearState, fetchUser, userId } = this.props

    clearState()
    fetchUser(userId)
  }

  componentDidUpdate() {
    const { message, fetchLoading } = this.props
    if (!!message && !fetchLoading) {
      snackbar(message)
    }
  }

  openSettings = () => {
    const { user, updateUser } = this.props

    if (isIOS()) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Edit Profile', 'Logout', 'Cancel'],
          cancelButtonIndex: 2,
          tintColor: Colors.royal
        },
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
              Actions.editProfile({ user, updateUser })
              break
            case 1:
              this.props.logoutUser()
              break

            default:
              break
          }
        }
      )
    }
  }

  handleDeleteAccount = (token, i) => {
    Alert.alert(
      'Remove account',
      `This will disconnect the Gmail account: ${token.email}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => this.props.revokeToken(token.id)
        }
      ]
    )
  }

  handleChangeAvatar = () => {
    const options = {
      title: 'Select Avatar',
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

  renderSettingButton = () => (
    <TouchableOpacity onPress={this.openSettings}>
      <Image source={Images.icons.settings} style={styles.settingIcon} />
    </TouchableOpacity>
  )

  closeSignatureSheet = () => {
    this.setState({ isOpen: false })
  }

  onSaveSignature = signature => {
    this.props.updateUser(this.props.user.id, {
      default_email_signature: signature
    })
    this.setState({ isOpen: false })
  }

  render() {
    const { user, updateUser, addToken } = this.props

    if (!user || !user.tokens) {
      return <Spinner />
    }

    return (
      <View style={styles.container}>
        <Header
          title="Profile"
          onBack={Actions.pop}
          backLabel="Back"
          rightComponent={this.renderSettingButton}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <View style={styles.profileHeader}>
            <Avatar
              src={user.profile_pic_url}
              name={user.first_name}
              email={user.email}
              size={120}
              fontSize={40}
              onPress={this.handleChangeAvatar}
            />

            <Spacer top={1} />
            <HeadingText>{`${user.first_name} ${user.last_name}`}</HeadingText>
          </View>

          <View style={styles.profileContent}>
            {user.tokens.length > 1 && (
              <PrimaryAccount
                email={getUserPrimaryEmail(user)}
                onPress={() => Actions.primaryAccount()}
              />
            )}

            {user.tokens.length > 0 && (
              <React.Fragment>
                <Spacer top={3} />
                <AccountsList
                  accounts={user.tokens}
                  onDelete={this.handleDeleteAccount}
                />
              </React.Fragment>
            )}

            <Spacer top={2} />
            <GmailConnectButton
              user={user}
              updateUser={updateUser}
              addToken={addToken}
            />
          </View>
        </ScrollView>
        <EmailSignatureSheet
          isOpen={this.state.isOpen}
          onClose={this.closeSignatureSheet}
          signature={
            user.default_email_signature || `Best, \n${user.first_name}`
          }
          onSavePress={this.onSaveSignature}
        />
      </View>
    )
  }
}

export default UserProfile

const styles = StyleSheet.create({
  container: Styles.container,
  settingIcon: { width: 28, height: 28 },
  content: { paddingBottom: Metrics.u(5) },
  profileHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.u(5)
  },
  profileContent: {
    paddingHorizontal: Metrics.u(2)
  }
})
