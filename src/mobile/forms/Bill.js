import React, {Component, PropTypes} from 'react'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import DateField from './fields/Date'
import MoneyField from './fields/Money'
import Part from './deep/Part'

import form from '../../common/forms/bill'
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
      <Form name={'bill.' + (this.props.bill ? 'update' : 'create')} action={submitBill} {...props}>
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

export default form(BillForm)
