import React, {Component, PropTypes} from 'react'
import {TouchableOpacity, StyleSheet, Text} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class Button extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    id: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  render() {
    const {intl, id, onPress, ...props} = this.props
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text {...props}>{intl.formatMessage({id})}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 20,
    // Android:
    elevation: 2,
    //iOS:
    // shadowColor: 'red',
    // shadowOffset: {width: 5, height: 5},
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
  },
})

export default injectIntl(Button)
