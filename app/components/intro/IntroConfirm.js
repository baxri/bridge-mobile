import React, { Component } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import { Field, reduxForm } from 'redux-form'
import { Container, Input, Item, Spinner, Button } from '../common'
import styles from './introStyles'

class IntroConfirm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    confirmIntro: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    introError: PropTypes.string,
    message: PropTypes.string,
    intro: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string
    })
  }

  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(values) {
    const { description, bio } = values
    this.props.confirmIntro(this.props.intro, { description, bio })
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <Container>
        <Item>
          <Field name="bio" multiline component={Input} placeholder="Bio" />
        </Item>
        <Item>
          <Field
            name="description"
            multiline
            component={Input}
            placeholder="Description"
          />
        </Item>
        {this.props.introError && (
          <Item>
            <Text style={styles.error}>{this.props.introError}</Text>
          </Item>
        )}
        {this.props.loading ? (
          <Item style={styles.loadingContainer}>
            <Spinner />
          </Item>
        ) : (
          <Item>
            <Button onPress={handleSubmit(this.handleFormSubmit)}>
              Confirm Intro
            </Button>
          </Item>
        )}
      </Container>
    )
  }
}

const validate = props => {
  const errors = {}
  const fields = ['bio', 'description']
  fields.forEach(f => {
    if (!(f in props)) {
      errors[f] = `${f} is required`
    }
  })
  return errors
}

export default reduxForm({ form: 'confirmation', validate })(IntroConfirm)
