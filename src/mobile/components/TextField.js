import React, {Component, PropTypes} from 'react'
import {TextInput, StyleSheet, View} from 'react-native'

import FormattedMessage from './FormattedMessage'

class TextField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.focus()
  }

  render() {
    const {name, touched, error, ...props} = this.props

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <TextInput
          ref={this.ref}
          style={styles.field}
          {...props}
        />
        <FormattedMessage id={touched && error && 'error.' + name} style={styles.error} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    marginHorizontal: 5,
  },
  field: {
    paddingTop: 0,
  },
  error: {
    color: '#F44336',
  },
})

export default TextField
