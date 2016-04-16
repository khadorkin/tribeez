import React, {Component} from 'react'

import TextField from 'material-ui/TextField'

import styles from '../../constants/styles'

class TextFieldWrapper extends Component {

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
    return (
      <TextField
        ref={this.ref}
        style={styles.field}
        {...this.props}
      />
    )
  }

}

export default TextFieldWrapper
