import React, {Component, PropTypes} from 'react'

import {reduxForm} from 'redux-form'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import DateField from './fields/Date'
import MoneyField from './fields/Money'
import Part from './deep/Part'

import validator from '../../common/utils/formValidator'

import submitBill from '../../common/actions/submitBill'

const today = new Date()
const methods = [ //TODO: translate
  {name: 'Shares', code: 'shares'},
  {name: 'Amounts', code: 'amounts'},
]

class BillForm extends Component {
  static propTypes = {
    // from parent:
    current: PropTypes.object,
    // from redux-form:
    fields: PropTypes.object,
    // from redux:
    users: PropTypes.array.isRequired,
    currency: PropTypes.string,
    lang: PropTypes.string,
    initialValues: PropTypes.object,
    bill: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleMethodChange = this.handleMethodChange.bind(this)
  }

  handleMethodChange(value) {
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
    const {fields: {name, description, payer, paid, amount, method, parts}, users, currency, ...props} = this.props

    const userItems = users.map((user) => ({name: user.name, code: user.id}))

    return (
      <Form name={'bill.' + (this.props.bill.id ? 'update' : 'create')} action={submitBill} {...props}>
        <TextField
          {...name}
          name="title"
        />
        <TextField
          multiline={true}
          {...description}
        />
        <SelectField
          items={userItems}
          {...payer}
        />
        <DateField
          max={today}
          {...paid}
        />
        <MoneyField
          currency={currency}
          {...amount}
        />
        <SelectField
          {...method}
          items={methods}
          onChange={this.handleMethodChange}
        />
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
      </Form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const bill = ownProps.current || state.bills.current || {} // either from routing state, or from ajax retrieval
  let initialValues
  if (bill.id) {
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

export default reduxForm({
  form: 'bill',
  fields: ['id', 'name', 'payer', 'paid', 'amount', 'method', 'description', 'parts[].user_id', 'parts[].amount'],
  validate: validator.bill,
  touchOnBlur: false,
}, mapStateToProps)(BillForm)
