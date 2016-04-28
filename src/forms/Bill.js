import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'

import {CardActions, CardText} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import TextField from './fields/Text'
import MoneyField from './fields/Money'
import SelectField from './fields/Select'
import DatePicker from './fields/Date'
import Part from './deep/Part'

import styles from '../constants/styles'

import validator, {focus, modified} from '../utils/formValidator'

import getBill from '../actions/getBill'
import submitBill from '../actions/submitBill'

const today = new Date()

class BillForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMethodChange = this.handleMethodChange.bind(this)
  }

  componentWillMount() {
    if (!this.props.bill && this.props.id) {
      this.props.getBill(this.props.id)
    }
  }

  componentDidMount() {
    this.props.setHook(() => modified(this.props.fields))
  }

  handleSubmit(event) {
    this.props.handleSubmit(submitBill)(event)
      .catch((errors) => focus(errors, this.refs))
  }

  handleMethodChange(value) {
    if (value === this.props.fields.method.value) {
      return // no change => no reset
    }
    if (value === 'shares') {
      this.props.fields.parts.forEach((part) => {
        part.amount.onChange(1)
      })
    } else {
      this.props.fields.parts.forEach((part) => {
        part.amount.onChange('')
      })
    }
    this.props.fields.method.onChange(value)
  }

  render() {
    const {fields: {name, description, payer, paid, amount, method, parts}, error, submitting, users, currency} = this.props

    const userItems = users.map((user) =>
      <MenuItem value={user.id} key={user.id} primaryText={user.name} />
    )

    return (
      <form onSubmit={this.handleSubmit}>
        <CardText>
          <TextField ref="name"
            required={true}
            {...name}
            name="title"
          />
          <TextField ref="description"
            multiLine={true}
            {...description}
          />
          <SelectField ref="payer"
            {...payer}
          >
            {userItems}
          </SelectField>
          <DatePicker ref="paid"
            required={true}
            locale={this.props.lang}
            maxDate={today}
            {...paid}
          />
          <MoneyField ref="amount"
            currency={currency}
            {...amount}
          />
          <SelectField ref="method"
            {...method}
            onChange={this.handleMethodChange}
          >
            <MenuItem value="shares" primaryText={<FormattedMessage id={'method.shares'} />} />
            <MenuItem value="amounts" primaryText={<FormattedMessage id={'method.amounts'} />} />
            {/* TODO: add items named "Category: _____" */}
          </SelectField>
          {
            parts.map((part, index) =>
              <Part key={index}
                method={method.value}
                amount={part.amount}
                currency={currency}
                user={users.find((u) => (u.id === part.user_id.value))}
              />
            )
          }
        </CardText>
        <CardActions style={styles.actions}>
          <RaisedButton label={<FormattedMessage id={'submit.bill.' + (this.props.bill ? 'update' : 'create')} />} type="submit" disabled={submitting} />
          <p className="error">
            {error && <FormattedMessage id={'error.' + error} />}
          </p>
        </CardActions>
      </form>
    )
  }
}

BillForm.propTypes = {
  // from parent component:
  id: PropTypes.number,
  current: PropTypes.object,
  setHook: PropTypes.func.isRequired,
  // from redux-form:
  fields: PropTypes.object,
  error: PropTypes.string,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  // from redux:
  users: PropTypes.array.isRequired,
  currency: PropTypes.string,
  lang: PropTypes.string,
  initialValues: PropTypes.object,
  bill: PropTypes.object,
  // action creators:
  getBill: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const bill = ownProps.current || state.bills.current // either from routing state, or from ajax retrieval
  let initialValues
  if (bill) {
    initialValues = {
      id: bill.id,
      name: bill.name,
      payer: bill.payer_id,
      paid: bill.paid,
      amount: bill.amount,
      method: 'amounts',
      description: bill.description,
      parts: bill.parts,
    }
  } else {
    initialValues = {
      payer: state.member.user.id,
      paid: today.getTime(),
      method: 'shares',
      parts: state.member.tribe.users.map((user) => ({user_id: user.id, amount: 1})),
    }
  }
  return {
    users: state.member.tribe.users,
    currency: state.member.tribe.currency,
    lang: state.app.lang,
    initialValues,
    bill,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBill,
}, dispatch)

export default reduxForm({
  form: 'bill',
  fields: ['id', 'name', 'payer', 'paid', 'amount', 'method', 'description', 'parts[].user_id', 'parts[].amount'],
  returnRejectedSubmitPromise: true,
  validate: validator.bill,
}, mapStateToProps, mapDispatchToProps)(BillForm)
