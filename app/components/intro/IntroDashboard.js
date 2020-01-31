import React, { Component } from 'react'
import {
  FlatList,
  View,
  TouchableWithoutFeedback,
  Text,
  RefreshControl
} from 'react-native'
import PropTypes from 'prop-types'
import { Actions } from 'react-native-router-flux'
import { Spinner, Item } from '../common'
import styles from './introStyles'
import Tabs from 'react-native-tabs'

const propTypes = {
  getIntroDashboard: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object,
  setListName: PropTypes.func.isRequired,
  listName: PropTypes.string.isRequired
}

class IntroDashboard extends Component {
  constructor(props) {
    super(props)
    this.createDataSource = this.createDataSource.bind(this)
    this.getListCnt = this.getListCnt.bind(this)
  }

  componentDidMount() {
    this.props.getIntroDashboard()

    this.createDataSource(this.props)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource({ data, listName }) {
    let list = []
    if (data !== null) {
      list = data[listName]
    }
    this.dataSource = list
  }

  renderRow({ item: intro }) {
    const { status, broker, from_email, to_alias } = intro

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Actions.introDetail({ intro })
        }}
      >
        <View style={{ backgroundColor: '#8223fe' }}>
          <Item style={styles.listContainerStyle}>
            <Text style={[styles.listTitleStyle, { flex: 4 }]}>
              {from_email}
            </Text>
            <Text style={[styles.listTitleStyle, { flex: 1 }]}>
              &#60; &#62;
            </Text>
            <Text style={[styles.listTitleStyle, { flex: 4 }]}>{to_alias}</Text>
          </Item>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  getListCnt(listName) {
    if (this.props.data) {
      return this.props.data[listName].length
    }
    return 0
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <FlatList
            style={{ marginBottom: 45 }}
            refreshControl={
              <RefreshControl
                refreshing={this.props.loading}
                onRefresh={this.props.getIntroDashboard}
              />
            }
            data={this.dataSource}
            renderItem={this.renderRow}
          />
        )}
        <Tabs
          selected={this.props.listName}
          style={{ backgroundColor: 'white', flex: 0 }}
          selectedStyle={{ color: 'red' }}
          onSelect={el => {
            this.props.setListName(el.props.name)
          }}
        >
          <Text name="action_required">
            Action Required - {this.getListCnt('action_required')}
          </Text>
          <Text name="open">Open - {this.getListCnt('open')}</Text>
          <Text name="finished">
            Completed/Rejected - {this.getListCnt('finished')}
          </Text>
        </Tabs>
      </View>
    )
  }
}

IntroDashboard.propTypes = propTypes

export default IntroDashboard
