import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

import TextField from 'material-ui/lib/text-field'

import styles from '../../constants/styles'

class MoneyFieldWrapper extends Component {

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
        type="number"
        step="0.01"
        min="0"
        {...this.props}
        //TODO: show currency
      />
    )
  }

}

export default MoneyFieldWrapper
