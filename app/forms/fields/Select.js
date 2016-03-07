import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

import SelectField from 'material-ui/lib/select-field'

import styles from '../../constants/styles'

class SelectFieldWrapper extends Component {

  constructor(props) {
    super(props)
    this.focus = this.focus.bind(this)
  }

  focus() {
    ReactDOM.findDOMNode(this.refs.field).scrollIntoView()
  }

  onChange(event, index, value) {
    this.props.onChange(value)
  }

  render() {
    return (
      <SelectField ref="field"
        style={styles.field} {...this.props}
        onChange={this.onChange.bind(this)}
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
