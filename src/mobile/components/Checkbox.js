import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'

import Touchable from './Touchable'

import colors from '../../common/constants/colors'

class Checkbox extends Component {
  static propTypes = {
    multiple: PropTypes.bool, // true for Radio button, false for Checkbox
    children: PropTypes.node.isRequired, // <Text> or raw text
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
  }

  constructor(props) {
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress() {
    this.props.onChange(!this.props.value)
  }

  render() {
    const {multiple, children, value, style, textStyle, ...props} = this.props

    const checked_icon = multiple ? 'check-box' : 'radio-button-checked'
    const unchecked_icon = multiple ? 'check-box-outline-blank' : 'radio-button-unchecked'

    return (
      <Touchable onPress={this.handlePress} style={[styles.container, style]}>
        <Icon size={24} color={colors.main} name={value ? checked_icon : unchecked_icon} />
        <Text style={[styles.label, textStyle]} {...props}>{children}</Text>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    paddingBottom: 1,
    marginLeft: 8,
    fontSize: 16,
  },
})

export default Checkbox
