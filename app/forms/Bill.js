import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {reduxForm} from 'redux-form'

import CardText from 'material-ui/lib/card/card-text'
import CardActions from 'material-ui/lib/card/card-actions'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'

import TextField from './fields/Text'
import MoneyField from './fields/Money'
import SelectField from './fields/Select'
import Part from './deep/Part'

import styles from '../constants/styles'

import validator from '../utils/formValidator'

import submitBill from '../actions/submitBill'

class BillForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitBill)(event)
      .catch((errors) => {
        const field = Object.keys(errors)[0]
        if (field !== '_error') {
          this.refs[field].focus()
        }
      })
  }

  render() {
    const {fields: {name, payer, amount, description, parts}, error, submitting} = this.props

    const userItems = this.props.users.map((user) =>
      <MenuItem value={user.id} key={user.id} primaryText={user.name} />
    )

    return (
      <form onSubmit={this.handleSubmit}>
        <CardText>
          <TextField ref="name"
            required={true}
            floatingLabelText="Title"
            errorText={name.touched && name.error && <FormattedMessage id="error.name" />}
            {...name}
          />
          <TextField ref="description"
            multiLine={true}
            floatingLabelText="Description (optional)"
            errorText={description.touched && description.error && <FormattedMessage id="error.description" />}
            {...description}
          />
          <SelectField ref="payer"
            floatingLabelText="Who paid?"
            errorText={payer.touched && payer.error && <FormattedMessage id="error.payer" />}
            {...payer}
          >
            {userItems}
          </SelectField>
          <MoneyField ref="amount"
            floatingLabelText="Total amount"
            errorText={amount.touched && amount.error && <FormattedMessage id={'error.amount.' + amount.error} />}
            {...amount}
          />
          {
            parts.map((part, index) =>
              <Part key={index} amount={part.amount} user={this.props.users.find((u) => (u.id === part.user.value))} />
            )
          }
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label="Add bill" type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id={error} />}
          </p>
        </CardActions>
      </form>
    )
  }
}

BillForm.propTypes = {
  users: PropTypes.array,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux state:
  initialValues: PropTypes.object,
}

const mapStateToProps = (state) => ({
  users: state.member.tribe.users,
  initialValues: {
    payer: state.member.user.id,
    parts: state.member.tribe.users.map((user) => ({user: user.id, amount: ''})),
  },
})

export default reduxForm({
  form: 'bill',
  fields: ['name', 'payer', 'amount', 'description', 'parts[].user', 'parts[].amount'],
  returnRejectedSubmitPromise: true,
  validate: validator.bill,
}, mapStateToProps)(BillForm)
