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
    errorId: PropTypes.string,
    multiline: PropTypes.bool,
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
    const {name, value, touched, error, multiline, ...props} = this.props
    let {errorId} = this.props

    const Comp = multiline ? TextArea : TextInput

    errorId = error && ('error.' + (errorId || name))

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
        <FormattedMessage id={touched && errorId} style={styles.error} />
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
