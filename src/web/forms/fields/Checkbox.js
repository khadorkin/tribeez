import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import Checkbox from 'material-ui/Checkbox'

import styles from '../../styles'

class CheckboxWrapper extends Component {

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.refs.enhancedSwitch.refs.root.scrollIntoView()
  }

  handleCheck(event, checked) {
    this.props.onChange(checked)
  }

  render() {
    return (
      <Checkbox
        ref={this.ref}
        style={styles.field}
        label={<FormattedMessage id={'field.' + this.props.name} />}
        {...this.props}
        onCheck={this.handleCheck}
        checked={this.props.value}
        onChange={null}
        value={''}
      />
    )
  }

}

CheckboxWrapper.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
}

export default CheckboxWrapper
