import React, {Component, PropTypes} from 'react'
import {Switch, StyleSheet, View} from 'react-native'

import FormattedMessage from '../../components/FormattedMessage'

import colors from '../../../common/constants/colors'

class SwitchField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  render() {
    const {name, value, touched, error/*, ...props*/} = this.props

    return (
      <View style={styles.container}>
        <View style={styles.field}>
          <Switch value={value} onValueChange={this.props.onChange} />
          <FormattedMessage id={'field.' + name} style={styles.label} />
        </View>
        <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  field: {
    flexDirection: 'row',
    marginHorizontal: 4,
  },
  label: {
    marginVertical: 2,
    marginHorizontal: 8,
    fontSize: 16,
  },
  error: {
    color: colors.error,
    margin: 8,
  },
})

export default SwitchField
