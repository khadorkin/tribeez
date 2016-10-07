import React, {Component, PropTypes} from 'react'

import ScrollView from '../hoc/ScrollView'
import Form from '../hoc/Form'
import {Field, FieldArray} from 'redux-form'
import TextField from './fields/Text'
import SelectField from './fields/Select'
import DateField from './fields/Date'
import Parts from './fields/Parts'
//import Part from './deep/Part'

import form from '../../common/forms/bill'
import submitBill from '../../common/actions/submitBill'

const today = Date.now()
const methods = [
  {code: 'shares'},
  {code: 'amounts'},
]

class BillForm extends Component {
  static propTypes = {
    // from redux:
    users: PropTypes.array.isRequired,
    currency: PropTypes.string,
    bill: PropTypes.object,
  }

  render() {
    const {users, currency, ...props} = this.props

    const userItems = users.map((user) => ({name: user.name, code: user.uid}))

    return (
      <ScrollView>
        <Form name={'bill.' + (this.props.bill ? 'update' : 'create')} action={submitBill} {...props}>
          <Field
            name="name"
            labelId="title"
            component={TextField}
          />
          <Field
            name="description"
            component={TextField}
            multiline={true}
          />
          <Field
            name="payer"
            component={SelectField}
            items={userItems}
          />
          <Field
            name="paid"
            component={DateField}
            max={today}
          />
          <Field
            name="amount"
            component={TextField}
            currency={currency}
          />
          <Field
            name="method"
            component={SelectField}
            items={methods}
          />
          <FieldArray
            name="parts"
            component={Parts}
          />
        </Form>
      </ScrollView>
    )
  }
}

export default form(BillForm)
