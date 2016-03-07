import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

import SelectField from 'material-ui/lib/select-field'

import styles from '../../constants/styles'

class SelectFieldWrapper extends Component {

  constructor(props) {
    super(props)
    this.focus = this.focus.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  focus() {
    ReactDOM.findDOMNode(this.refs.field).scrollIntoView()
  }

  handleChange(event, index, value) {
    this.props.onChange(value)
  }

  render() {
    return (
      <SelectField ref="field"
        style={styles.field} {...this.props}
        onChange={this.handleChange}
      >
        {this.props.children}
      </SelectField>
    )
  }

}

SelectFieldWrapper.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default SelectFieldWrapper
