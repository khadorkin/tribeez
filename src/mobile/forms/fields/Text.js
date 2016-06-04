import React, {Component, PropTypes} from 'react'
import {TextInput, StyleSheet, View} from 'react-native'

import FormattedMessage from '../../components/FormattedMessage'

import colors from '../../../common/constants/colors'

class TextField extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
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
    const {name, touched, error, ...props} = this.props

    return (
      <View style={styles.container}>
        <FormattedMessage id={'field.' + name} style={styles.label} />
        <TextInput
          ref={this.ref}
          style={[styles.field, {height: Math.max(40, this.state.height + 20)}]}
          {...props}
          onChange={this.handleChange}
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
    color: colors.error,
    marginHorizontal: 5,
  },
})

export default TextField
