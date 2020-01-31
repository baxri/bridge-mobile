import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Container, Item, Button, Text } from '../common'
import styles from './introStyles'
import extractFirstName from '../../utils/extractFirstName'
import { connect } from 'react-redux'
import { getIntroList } from 'intropath-core/actions/introduction'
import { orderBy } from 'lodash'

class IntroPublishDone extends Component {
  componentDidMount() {
    if (!this.props.loaded) this.props.getIntroList()
  }

  render() {
    const { nextIntro, intro } = this.props

    return (
      <Container testID="introPublishDoneScreen">
        <Item style={styles.heading}>
          <Text style={styles.headingText}>
            Nice work :){'\n'}
            Intro sent.
          </Text>
        </Item>
        <Item style={ownStyles.row}>
          {!!nextIntro && (
            <Button buttonStyle={ownStyles.button} onPress={this.goToNextIntro}>
              SHOW NEXT INTRO WAITING CONFIRMATION
            </Button>
          )}

          <Button buttonStyle={ownStyles.button} onPress={Actions.introList}>
            SHOW ALL INTROS
          </Button>
        </Item>
        <Item>
          <Button onPress={this.goToHome}>I{"'"}M DONE, THANKS!</Button>
        </Item>
      </Container>
    )
  }

  goToNextIntro = () => {
    const { nextIntro } = this.props
    Actions.introItem({ intro: nextIntro })
  }

  goToHome = () => Actions.home({ type: 'reset' })
}

const ownStyles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    marginBottom: 10
  },
  button: {
    flex: null
  }
})

const mapStateToProps = ({ introduction }) => {
  const intros = orderBy(
    introduction.list,
    intro => new Date(intro.updated_at),
    'desc'
  )

  const nextIntro = intros.find(intro => intro.status === 'confirmed')

  return { nextIntro, loaded: introduction.list.length > 0 }
}

export default connect(
  mapStateToProps,
  { getIntroList }
)(IntroPublishDone)
