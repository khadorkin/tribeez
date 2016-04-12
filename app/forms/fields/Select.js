import React, {Component, PropTypes} from 'react'

import SelectField from 'material-ui/lib/select-field'

import styles from '../../constants/styles'

class SelectFieldWrapper extends Component {

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.scrollIntoView()
  }

  handleChange(event, index, value) {
    this.props.onChange(value)
  }

  render() {
    return (
      <SelectField
        ref={this.ref}
        style={styles.field}
        {...this.props}
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
