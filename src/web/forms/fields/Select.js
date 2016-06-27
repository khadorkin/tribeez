import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import SelectField from 'material-ui/SelectField'

import styles from '../../styles'

class SelectFieldWrapper extends Component {
  static propTypes = {
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
  }

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
        floatingLabelText={<FormattedMessage id={'field.' + this.props.name} />}
        errorText={this.props.touched && this.props.error && <FormattedMessage id={'error.' + this.props.name} />}
        {...this.props}
        onChange={this.handleChange}
      >
        {this.props.children}
      </SelectField>
    )
  }

}

export default SelectFieldWrapper
