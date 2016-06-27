import React, {Component, PropTypes} from 'react'
import {FormattedNumber} from 'react-intl'

import {red500, green500} from 'material-ui/styles/colors'

class Money extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    style: PropTypes.object,
  }

  render() {
    const {value, style} = this.props

    const sign = ((value > 0) ? '+' : '')

    return (
      <span style={{...style, color: (value < 0 ? red500 : green500)}}>
        {sign}
        <FormattedNumber
          value={value}
          format="money"
        />
      </span>
    )
  }
}

export default Money
