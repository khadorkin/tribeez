import React, {Component, PropTypes} from 'react'

import SelectField from 'material-ui/lib/select-field'

class SelectFieldWrapper extends Component {

  onChange(event, index, value) {
    this.props.onChange(value)
  }

  render() {
    return (
      <SelectField {...this.props} onChange={this.onChange.bind(this)}>
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
