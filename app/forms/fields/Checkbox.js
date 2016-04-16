import React, {Component, PropTypes} from 'react'

import Checkbox from 'material-ui/Checkbox'

import styles from '../../constants/styles'

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
        {...this.props}
        onCheck={this.handleCheck}
        checked={Boolean(this.props.value)}
        onChange={null}
        value={''}
      />
    )
  }

}

CheckboxWrapper.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any, // because redux-form sets it to a string instead of boolean
}

export default CheckboxWrapper
