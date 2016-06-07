import React, {Component, PropTypes} from 'react'
import {TextInput, StyleSheet, View} from 'react-native'

import FormattedMessage from '../../components/FormattedMessage'
import TextArea from '../../components/TextArea'

import colors from '../../../common/constants/colors'

class TextField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    multiline: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      height: 0,
    }
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.focus()
  }

  handleChange(event) {
    this.props.onChange(event)
    this.setState({
      height: event.nativeEvent.contentSize.height,
    })
  }

  render() {
    const {name, touched, error, multiline, ...props} = this.props

    const Comp = multiline ? TextArea : TextInput

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <Comp
          ref={this.ref}
          style={styles.field}
          underlineColorAndroid={colors.underline}
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
    height: 39,
  },
  error: {
    color: colors.error,
    marginHorizontal: 5,
  },
})

export default TextField
