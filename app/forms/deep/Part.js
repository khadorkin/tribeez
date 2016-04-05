import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import TextField from 'material-ui/lib/text-field'

import IconButton from 'material-ui/lib/icon-button'
import AddIcon from 'material-ui/lib/svg-icons/content/add'
import RemoveIcon from 'material-ui/lib/svg-icons/content/remove'

import MoneyField from '../fields/Money'

export default class Part extends Component {

  //TODO: pure rendering?

  constructor(props) {
    super(props)
    this.handleRemoveShare = this.handleRemoveShare.bind(this)
    this.handleAddShare = this.handleAddShare.bind(this)
  }

  handleRemoveShare() {
    if (this.props.amount.value > 0) {
      this.props.amount.onChange(this.props.amount.value - 1)
    }
  }

  handleAddShare() {
    this.props.amount.onChange(this.props.amount.value + 1)
  }

  render() {
    const {user, amount, method, ...rest} = this.props

    if (!user) {
      return null // in cases users are not loaded yet
    }

    return (
      <div style={{display: 'flex'}}>
        <label style={{flexGrow: 1}}>{user.name}</label>
        {
          method === 'shares' ? (
            <div style={{whiteSpace: 'nowrap'}}>
              <IconButton onTouchTap={this.handleRemoveShare}><RemoveIcon /></IconButton>
              <TextField
                style={{width: 80}}
                inputStyle={{textAlign: 'center'}}
                type="number"
                step="1"
                min="0"
                max="10"
                {...amount}
              />
              <IconButton onTouchTap={this.handleAddShare}><AddIcon /></IconButton>
            </div>
          ) : (
            <div style={{whiteSpace: 'nowrap'}}>
              <TextField
                style={{width: 80}}
                type="number"
                step="0.01"
                min="0"
                {...amount}
                //TODO: show currency
              />
            </div>
          )
        }
      </div>
    )
  }
}

Part.propTypes = {
  // from parent form:
  user: PropTypes.object,
  amount: PropTypes.object.isRequired,
  method: PropTypes.string.isRequired,
}
