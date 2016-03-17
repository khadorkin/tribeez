import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

import TextField from 'material-ui/lib/text-field'

import styles from '../../constants/styles'

class MoneyFieldWrapper extends Component {

  constructor(props) {
    super(props)
    this.focus = this.focus.bind(this)
  }

  focus() {
    ReactDOM.findDOMNode(this.refs.field.refs.input).focus()
  }

  render() {
    return (
      <TextField ref="field"
        style={styles.field}
        type="number"
        step="0.01"
        min="0"
        {...this.props}
      />
    )
  }

}

MoneyFieldWrapper.propTypes = {
  errorText: PropTypes.node,
}

export default MoneyFieldWrapper
