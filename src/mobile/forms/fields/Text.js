import React, {Component, PropTypes} from 'react'
import {TextInput, StyleSheet, View} from 'react-native'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

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
    icon: PropTypes.string,
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
    const {name, value, touched, error, multiline, icon, ...props} = this.props
    let {errorId} = this.props

    const Comp = multiline ? TextArea : TextInput

    errorId = error && ('error.' + (errorId || name))

    let label
    if (icon) {
      label = <MaterialIcon name={icon} size={20} color={colors.input} style={styles.icon} />
    } else {
      label = <FormattedMessage id={'field.' + name} style={styles.label} />
    }

    return (
      <View style={styles.container}>
        {label}
        <Comp
          ref={this.ref}
          style={icon ? styles.fieldWithIcon : styles.field}
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
  icon: {
    position: 'absolute',
    left: 4,
    top: 8,
  },
  field: {
    height: 39,
  },
  fieldWithIcon: {
    height: 39,
    paddingLeft: 32,
    color: colors.input,
  },
  error: {
    color: colors.error,
    marginHorizontal: 5,
  },
})

export default TextField
