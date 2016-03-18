import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'
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

import getBill from '../actions/getBill'
import submitBill from '../actions/submitBill'

class BillForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    if (!this.props.bill && this.props.id) {
      this.props.getBill(this.props.id)
    }
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
          <RaisedButton label={this.props.bill ? 'Update bill' : 'Add bill'} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id={error} />}
          </p>
        </CardActions>
      </form>
    )
  }
}

BillForm.propTypes = {
  // from parent component:
  id: PropTypes.number,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux state:
  initialValues: PropTypes.object,
  users: PropTypes.array,
  bill: PropTypes.object,
  // action creators:
  getBill: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const bill = state.routing.location.state || state.bills.current
  let initialValues
  if (bill) {
    initialValues = {
      id: bill.id,
      name: bill.name,
      payer: bill.payer_id,
      amount: bill.amount,
      description: bill.description,
      parts: bill.parts.map((part) => ({user: part.user_id, amount: part.amount})),
    }
  } else {
    initialValues = {
      payer: state.member.user.id,
      parts: state.member.tribe.users.map((user) => ({user: user.id, amount: ''})),
    }
  }
  return {
    users: state.member.tribe.users,
    initialValues,
    bill,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBill,
}, dispatch)

export default reduxForm({
  form: 'bill',
  fields: ['id', 'name', 'payer', 'amount', 'description', 'parts[].user', 'parts[].amount'],
  returnRejectedSubmitPromise: true,
  validate: validator.bill,
}, mapStateToProps, mapDispatchToProps)(BillForm)
