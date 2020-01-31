import React, { Component } from 'react'
import Avatar from './Avatar'
import { API_URL } from '../../actions/types'

const ContactAvatar = ({ contact, style }) =>
  contact.profile_pic_url ? (
    <Avatar
      src={`${API_URL}/contacts/${contact.id}/profile_pic_url`}
      style={style}
    />
  ) : null

export default ContactAvatar
