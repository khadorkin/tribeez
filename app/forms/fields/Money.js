import React, {Component, PropTypes} from 'react'

import TextField from 'material-ui/lib/text-field'
import * as colors from 'material-ui/lib/styles/colors'

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
      <div style={{position: 'relative'}}>
        <TextField
          ref={this.ref}
          style={styles.field}
          inputStyle={{width: 'calc(100% - 50px)'}}
          type="number"
          step="0.01"
          min="0"
          {...this.props}
          //TODO: show currency
        />
        <div style={{position: 'absolute', top: 40, right: 4, color: colors.grey300}}>
          {this.props.currency}
        </div>
      </div>
    )
  }

}

MoneyFieldWrapper.propTypes = {
  // from parent form:
  currency: PropTypes.string,
}

export default MoneyFieldWrapper
