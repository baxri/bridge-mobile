// import Contacts from 'react-native-contacts'
import { uniqBy } from 'lodash'

export default function importContacts() {
  return new Promise((resolve, reject) => {
    resolve([])

    // disable getting contacts from local phone, since we're getting contacts from google.
    // https://gitlab.com/intropath/intropath/issues/439
    // Contacts.getAll((err, contacts) => {
    //   if (err === 'denied') {
    //     reject(err)
    //   } else {
    //     resolve(extractContacts(contacts))
    //   }
    // })
  })
}

function extractContacts(rawContacts) {
  const contacts = []

  rawContacts.forEach(rawContact => {
    const name = `${rawContact.givenName} ${rawContact.familyName}`

    ;(rawContact.emailAddresses || []).forEach(({ email }) =>
      contacts.push({ name, email })
    )
  })

  return uniqBy(contacts, 'email')
}
