import React from 'react'
import Spacer from '../spacer'
import { Button } from '../button'
import styles from './styles'

export default function ButtonGroup() {
  return (
    <Spacer>
      <Button
        small
        text="Accept Intro"
        buttonStyle={styles.accept}
        style={styles.acceptBtn}
      />
      <Button
        transparent
        text="No Thanks"
        buttonStyle={styles.reject}
        style={styles.rejectBtn}
      />
    </Spacer>
  )
}
