import React from 'react'
import { View, StyleSheet } from 'react-native'
import Pie from 'react-native-pie'
import { Text } from '../common'
import { completedIntros } from '../../utils/filterIntros'
import getCompletedIntrosPercentage from '../../utils/getCompletedIntrosPercentage'

class IntroStatsBox extends React.Component {
  render() {
    const { intros, testID } = this.props
    const completedIntrosPercentage = getCompletedIntrosPercentage(intros)

    return (
      <View testID={testID} style={styles.card}>
        <Text style={[styles.row, styles.title]}>Stats</Text>
        <View style={[styles.row, styles.pie]}>
          <Pie
            radius={80}
            innerRadius={60}
            series={[completedIntrosPercentage]}
            colors={['#fd4c57']}
            backgroundColor="#ddd"
          />
          <Text style={styles.pieText}>
            <Text style={styles.value}>{completedIntrosPercentage}%</Text>
            {'\n'}Intros{'\n'}Completed
          </Text>
        </View>
        <Text style={[styles.row, styles.textCenter]}>
          <Text style={styles.value}>{completedIntros(intros).length}</Text>{' '}
          Intros Completed
        </Text>
        <Text style={[styles.row, styles.textCenter]}>
          <Text style={styles.value}>{intros.length}</Text> Intros Iniated
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    alignItems: 'stretch'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  title: {
    fontSize: 18
  },
  pie: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  pieText: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  textCenter: {
    textAlign: 'center'
  },
  value: {
    fontSize: 20
  }
})

export default IntroStatsBox
