import React, {Component, PropTypes} from 'react'
import {TextInput, StyleSheet} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

class TextField extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    name: PropTypes.string.isRequired,
    style: PropTypes.object,
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
    const {intl, name, style, ...props} = this.props

    const mergedStyle = style ? {...styles.field, ...style} : styles.field

    return (
      <TextInput
        ref={this.ref}
        placeholder={intl.formatMessage({id: 'field.' + name})}
        style={mergedStyle}
        {...props}
      />
    )
  }
}

const styles = StyleSheet.create({
  field: {
    //
  },
})

export default injectIntl(TextField, {withRef: true})
