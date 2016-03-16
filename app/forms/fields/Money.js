import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

import TextField from 'material-ui/lib/text-field'

import styles from '../../constants/styles'

class MoneyFieldWrapper extends Component {

  constructor(props) {
    super(props)
    this.focus = this.focus.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  focus() {
    ReactDOM.findDOMNode(this.refs.field.refs.input).focus()
  }

  handleChange(event) {
    // for older browsers:
    this.props.onChange(event.target.value.replace(/,/g, '.'))
  }

  render() {
    return (
      <TextField ref="field"
        style={styles.field}
        type="number"
        step="0.01"
        min="0"
        {...this.props}
        onChange={this.handleChange}
      />
    )
  }

}

MoneyFieldWrapper.propTypes = {
  errorText: PropTypes.node,
  onChange: PropTypes.func.isRequired,
}

export default MoneyFieldWrapper
