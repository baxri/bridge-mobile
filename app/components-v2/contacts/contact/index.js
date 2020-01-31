import React, { Component } from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  Share,
  Platform,
  ActionSheetIOS,
  Clipboard,
  Linking,
  Alert
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { debounce } from 'lodash'
import Avatar from 'app/components-v2/common/avatar'
import {
  Button,
  ContactEditor,
  Intro,
  SearchBar,
  Spacer
} from 'app/components-v2/common'
import { searchFilter } from 'app/utils/filterIntros'
import Mixpanel from 'app/utils/mixpanel'
import { INTRO_LINK_CLICKED } from 'app/shared/mixpanelConstants'
import BackButton from 'app/components-v2/common/header/BackButton'
import FilterIntrosContact from './filter'
import extractFirstName from 'app/utils/extractFirstName'
import { Colors, Images } from 'app/themes'
import {
  checkUserPrimaryToken,
  goToGoogleSync
} from 'app/utils/checkGoogleAccount'
import {
  HeadingText,
  BodyText,
  CaptionText,
  ActionButton,
  HeaderRight,
  ShowMoreText,
  SocialIcon
} from 'app/components-v2/common'

import MakeIntro from './sheets/MakeIntro'
import IntroLink from './sheets/IntroLink'
import s from './Styles'

export default class Contact extends Component {
  state = {
    query: '',
    filter: 0,
    filters: [],
    intros: searchFilter(this.props.intros, {
      query: '',
      status: 'all'
    }),
    contact: this.props.contact,
    limit: 10,
    page: 10,
    searching: false,

    makeIntroSheetOpen: false,
    introLinkSheetOpen: false,
    editContactSheetOpen: false
  }

  loadMore = () => {
    this.setState({ limit: this.state.limit + this.state.page })
  }

  componentDidMount() {
    this.setFilters(this.state.intros, this.state.contact)
    if (this.props.contact) {
      this.props.fetchContact(this.props.contact.id)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.shareTimeout)
    clearTimeout(this.copyTimeout)
    clearTimeout(this.previewTimeout)
    clearTimeout(this.onBackTimeout)
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loadedContact && this.props.loadedContact) {
      this.setState({
        contact: {
          ...this.state.contact,
          ...{
            name: this.props.loadedContact.name,
            bio: this.props.loadedContact.bio,
            bio_source: this.props.loadedContact.bio_source,
            share_link: this.props.loadedContact.share_link,
            linkedin_profile_url: this.props.loadedContact.linkedin_profile_url,
            profile_pic_url: this.props.loadedContact.profile_pic_url,
            twitter: this.props.loadedContact.twitter
          }
        }
      })
    }
  }

  updateState = (state, searchUpdated = false) => {
    this.setState(state, () => {
      this.updateIntros(searchUpdated)
    })
  }

  updateIntros = searchUpdated => {
    const { query, filter, filters, intros, contact } = this.state
    const q = query && query.trim().length > 0 ? query.trim() : ''

    let updatedIntros = searchFilter(this.props.intros, {
      query: q,
      status: filters[filter].value
    })

    this.setState({
      intros: updatedIntros
    })

    if (searchUpdated) {
      this.setFilters(updatedIntros, contact)
    }
  }

  setFilters = (intros, contact) => {
    const counts = {
      all: searchFilter(intros, { ...contact, status: 'all' }).length,
      active: searchFilter(intros, { ...contact, status: 'active' }).length,
      confirm: searchFilter(intros, { ...contact, status: 'confirm' }).length,
      noreply: searchFilter(intros, { ...contact, status: 'noreply' }).length,
      completed: searchFilter(intros, { ...contact, status: 'completed' })
        .length,
      declined: searchFilter(intros, { ...contact, status: 'declined' }).length,
      archived: searchFilter(intros, { ...contact, status: 'archived' }).length
    }

    this.setState({
      filters: [
        {
          label: 'All',
          muted: counts.all.toString(),
          icon: Images.filter.all,
          value: 'all'
        },
        {
          label: 'Active',
          muted: counts.active.toString(),
          icon: Images.filter.active,
          value: 'active'
        },
        {
          label: 'To Do',
          muted: counts.confirm.toString(),
          icon: Images.filter.confirm,
          value: 'confirm'
        },
        {
          label: 'No Reply',
          muted: counts.noreply.toString(),
          icon: Images.filter.noreply,
          value: 'noreply'
        },
        {
          label: 'Done',
          muted: counts.completed.toString(),
          icon: Images.filter.completed,
          value: 'completed'
        },
        {
          label: 'Declined',
          muted: counts.declined.toString(),
          icon: Images.filter.declined,
          value: 'declined'
        },
        {
          label: 'Archived',
          muted: counts.archived.toString(),
          icon: Images.filter.archived,
          value: 'archived'
        }
      ]
    })
  }

  share = () => {
    this.closeIntroLinkSheet()

    this.shareTimeout = setTimeout(() => {
      const { user } = this.props
      const { contact: loadedContact } = this.state

      if (loadedContact && loadedContact.share_link) {
        Share.share(
          { message: loadedContact.share_link },
          {
            excludedActivityTypes: [
              'com.apple.UIKit.activity.Print',
              'com.apple.UIKit.activity.AssignToContact',
              'com.apple.UIKit.activity.SaveToCameraRoll',
              'com.apple.UIKit.activity.AddToReadingList',
              'com.apple.UIKit.activity.PostToFlickr',
              'com.apple.UIKit.activity.PostToVimeo',
              'com.apple.reminders.RemindersEditorExtension',
              'com.apple.mobilenotes.SharingExtension'
            ]
          }
        )
      }

      Mixpanel.trackWithProperties(INTRO_LINK_CLICKED, {
        UserId: user.id,
        ContactId: loadedContact.id
      })
    }, 500)
  }

  copy = () => {
    this.copyTimeout = setTimeout(() => {
      this.closeIntroLinkSheet()
    }, 1500)

    const { contact: loadedContact } = this.state
    const { share_link } = loadedContact
    Clipboard.setString(share_link)
  }

  preview = () => {
    this.previewTimeout = setTimeout(() => {
      this.closeIntroLinkSheet()
    }, 1000)

    const { contact: loadedContact } = this.state
    const { share_link } = loadedContact

    Linking.openURL(share_link).catch(() => {
      Alert.alert('Cannot open link for preview!', '', [
        { text: 'OK', style: 'cancel' }
      ])
    })
  }

  splitContactName = name => {
    if (!name) {
      return ['', '']
    }

    let splited = name.split(' ')

    if (splited.length > 1) {
      return [splited[0], splited.slice(1).join(' ')]
    } else {
      return [splited[0], '']
    }
  }

  updateContact = () => {
    let { contact, loadedContact } = this.props
    if (loadedContact) {
      contact = { ...contact, ...loadedContact }
    }

    return contact
  }

  startIntro = debounce(
    contact => {
      const contactName = contact.name
        ? extractFirstName(contact.name)
        : contact.email
      contact.name = contact.name || ''

      const openActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: [
              `Intro ${contactName} to someone`,
              `Intro someone to ${contactName}`,
              'Cancel'
            ],
            cancelButtonIndex: 2,
            destructiveButtonIndex: 2
          },
          index => {
            if (index === 2) return

            let params = {}
            if (index === 0) {
              params.fromContact = contact
            } else {
              params.toContact = contact
            }
            Actions.introCreate(params)
          }
        )
      }

      const { tokens } = this.props.user
      checkUserPrimaryToken(tokens)
        .then(ok => {
          // If ok then show action sheet otherwise go to google sync screen
          if (ok) {
            openActionSheet()
          } else {
            goToGoogleSync(tokens)
          }
        })
        .catch(() => {
          // TODO Still open action sheet?
          openActionSheet()
        })
    },
    1000,
    { trailing: false, leading: true }
  )

  openMakeIntroSheet = () => {
    const { contact } = this.state

    if (contact.name === '') {
      Alert.alert('Missing name', 'Contact must include a name.', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Edit Contact',
          onPress: () => this.setState({ editContactSheetOpen: true })
        }
      ])
    } else {
      this.setState({ makeIntroSheet: true })
    }
  }

  closeMakeIntroSheet = () => {
    this.setState({ makeIntroSheet: false })
  }

  openIntroLinkSheet = () => {
    if (this.state.contact.name) {
      this.setState({ introLinkSheet: true })
    } else {
      Alert.alert(
        'Missing contact name',
        'Please edit this contact & add a name'
      )
    }
  }

  closeIntroLinkSheet = () => {
    this.setState({ introLinkSheet: false })
  }

  renderIntros = (intros, limit, user) =>
    intros.slice(0, limit).map((intro, key) => (
      <Spacer left={2} right={2} bottom={1} key={key}>
        <Intro key={key} {...intro} user={user} referer="contacts" />
      </Spacer>
    ))

  onBack = () => {
    Actions.pop()

    if (this.props.navigation.state.params.searching) {
      this.onBackTimeout = setTimeout(() => {
        Actions.refresh({
          searching: this.props.navigation.state.params.searching
        })
      }, 100)
    }
  }

  render() {
    const { intros, limit, query, contact } = this.state
    const searchIntros = query !== '' ? intros : []

    contact.name = contact.name || ''

    return (
      <View style={[s.container]}>
        <SearchBar
          ref={ref => (this.searchBarRef = ref)}
          query={query}
          title="Contact Profile"
          leftComponent={
            <BackButton backLabel="Contacts" onPress={this.onBack} />
          }
          rightComponent={
            <HeaderRight
              onPress={() => this.setState({ editContactSheetOpen: true })}
            />
          }
          updateSearch={text => this.updateState({ query: text })}
          onSearch={searching => this.setState({ searching })}
          containerStyle={s.appBar}
        />

        {this.state.searching ? (
          <KeyboardAwareScrollView
            keyboardShouldPersistTaps="handled"
            behavior="position"
          >
            <Spacer vertical={1} horizontal={0}>
              {this.renderIntros(searchIntros, limit, this.props.user)}
            </Spacer>
          </KeyboardAwareScrollView>
        ) : (
          <ScrollView>
            <Spacer top={4} left={4} right={4}>
              <View style={s.profileHeader}>
                <View style={s.profileHeaderLeft}>
                  <Spacer bottom={1}>
                    <Avatar
                      src={this.state.contact.profile_pic_url}
                      email={this.state.contact.email}
                      name={this.state.contact.name}
                      size={80}
                      fontSize={40}
                    />
                  </Spacer>

                  {contact.name ? (
                    <Spacer top={1}>
                      <HeadingText text={contact.name} version={1} />
                    </Spacer>
                  ) : null}

                  {contact.email ? (
                    <Spacer top={1}>
                      <BodyText
                        text={contact.email}
                        version={2}
                        color={Colors.grey}
                      />
                    </Spacer>
                  ) : null}
                </View>

                <View style={s.profileHeaderRight}>
                  {contact.linkedin_profile_url ? (
                    <SocialIcon
                      name="linkedin"
                      link={contact.linkedin_profile_url}
                    />
                  ) : null}

                  {contact.twitter ? (
                    <SocialIcon
                      name="twitter"
                      link={contact.twitter}
                      space={true}
                    />
                  ) : null}
                </View>
              </View>

              {contact.bio ? (
                <Spacer top={1}>
                  <ShowMoreText moreText="more" lessText="less">
                    {contact.bio}
                  </ShowMoreText>
                </Spacer>
              ) : null}

              {contact.bio_source ? (
                <Spacer top={1}>
                  <CaptionText style={s.bioSource}>
                    {contact.bio_source}
                  </CaptionText>
                </Spacer>
              ) : null}

              <View style={s.actionButtons}>
                <ActionButton
                  text="Make intro"
                  type="make-intro"
                  color={Colors.primaryV2}
                  onPress={() => this.openMakeIntroSheet()}
                />
                <Spacer left={3}>
                  <ActionButton
                    text="Intro link"
                    type="intro-link"
                    color={Colors.primaryDark}
                    onPress={() => this.openIntroLinkSheet()}
                  />
                </Spacer>
              </View>

              <MakeIntro
                contact={contact}
                isOpen={this.state.makeIntroSheet}
                onItemPress={item => {
                  this.closeMakeIntroSheet()

                  let params = {}
                  if (item === 1) {
                    params.fromContact = contact
                  } else {
                    params.toContact = contact
                  }
                  Actions.introCreate(params)
                }}
                onClose={() => this.closeMakeIntroSheet()}
              />

              <IntroLink
                isOpen={this.state.introLinkSheet}
                onPress={item => {
                  if (item === 1) {
                    this.copy()
                  }

                  if (item === 2) {
                    this.share()
                  }

                  if (item === 3) {
                    this.preview()
                  }
                }}
                onClose={() => this.closeIntroLinkSheet()}
              />
            </Spacer>

            <View style={s.bottomShadow} />

            <Spacer bottom={0} top={2} left={2} right={2}>
              <FilterIntrosContact
                state={this.state}
                updateState={this.updateState}
                onSearchPress={() => this.searchBarRef.onSearch()}
              />
            </Spacer>

            {this.renderIntros(intros, limit, this.props.user)}

            {limit < intros.length && (
              <Spacer left={2} right={2} bottom={2}>
                <Button
                  alt
                  onPress={this.loadMore}
                  text={`Load More (${intros.length - limit})`}
                />
              </Spacer>
            )}
          </ScrollView>
        )}

        <ContactEditor
          isOpen={this.state.editContactSheetOpen}
          onClose={() => {
            this.setState({ editContactSheetOpen: false })
          }}
          contact={contact}
          isEditContact={true}
          updateContact={newContact =>
            new Promise((resolve, reject) => {
              const { contact } = this.state
              this.props
                .updateContact(newContact, true)
                .then(res => {
                  this.setState({ contact: { contact, ...newContact.contact } })
                  resolve({ data: contact })
                })
                .catch(err => {
                  this.props.updateContacts()
                  reject(err)
                })
            })
          }
          onContactSaved={() => this.setState({ editContactSheetOpen: false })}
        />
      </View>
    )
  }
}
