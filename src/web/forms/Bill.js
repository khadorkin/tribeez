import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import MenuItem from 'material-ui/MenuItem'

import Form from '../hoc/Form'
import TextField from './fields/Text'
import MoneyField from './fields/Money'
import SelectField from './fields/Select'
import DatePicker from './fields/Date'
import Part from './deep/Part'

import form from '../../common/forms/bill'
import focus from '../../common/utils/formFocus'
import getBill from '../../common/actions/getBill'
import submitBill from '../../common/actions/submitBill'

const today = new Date()

class BillForm extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMethodChange = this.handleMethodChange.bind(this)
  }

  componentDidMount() {
    // when accessing directly to /bill/:id
    if (!this.props.bill && this.props.id) {
      this.props.getBill(this.props.id)
    }
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
    const {fields: {name, description, payer, paid, amount, method, parts}, users, userMap, currency} = this.props

    const userItems = users.map((user) => {
      return <MenuItem value={user.id} key={user.id} primaryText={user.name} />
    })

    return (
      <Form name={'bill.' + (this.props.bill ? 'update' : 'create')} onSubmit={this.handleSubmit} {...this.props}>
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
              user={userMap[part.user_id.value]}
            />
          )
        }
      </Form>
    )
  }
}

BillForm.propTypes = {
  // from parent component:
  id: PropTypes.number,
  current: PropTypes.object,
  // from redux-form:
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  // from redux:
  users: PropTypes.array.isRequired,
  userMap: PropTypes.object.isRequired,
  currency: PropTypes.string,
  lang: PropTypes.string,
  initialValues: PropTypes.object,
  bill: PropTypes.object,
  // action creators:
  getBill: PropTypes.func.isRequired,
}

export default form(BillForm, {getBill})
