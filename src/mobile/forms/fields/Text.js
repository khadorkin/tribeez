import React, {Component, PropTypes} from 'react'
import {TextInput, StyleSheet, View} from 'react-native'

import FormattedMessage from '../../components/FormattedMessage'
import TextArea from '../../components/TextArea'

import colors from '../../../common/constants/colors'

class TextField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    touched: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    multiline: PropTypes.bool,
    errorIsObject: PropTypes.bool,
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
    const {name, value, touched, error, errorIsObject, multiline, ...props} = this.props

    const Comp = multiline ? TextArea : TextInput

    let errorId
    let values

    if (error) {
      errorId = 'error.' + name
      if (errorIsObject) {
        errorId += '_' + (error.id || error)
      }
      if (typeof error === 'object') {
        values = error
      }
    }

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <Comp
          ref={this.ref}
          style={styles.field}
          underlineColorAndroid={colors.underline}
          value={String(value)}
          {...props}
        />
        <FormattedMessage id={touched && errorId} values={values} style={styles.error} />
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
    height: 39,
  },
  error: {
    color: colors.error,
    marginHorizontal: 5,
  },
})

export default TextField
