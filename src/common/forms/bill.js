import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const now = Date.now() // need to be called only once, otherwise form reinitializes indefinitely

const mapStateToProps = (state, ownProps) => {
  const bill = ownProps.current || state.bills.current // either from routing state, or from ajax retrieval
  let initialValues
  if (bill) {
    const partsByUid = {}
    bill.parts.forEach((part) => {
      partsByUid[part.user_id] = part.amount
    })
    const parts = state.member.tribe.users
      .map((user) => ({user_id: user.id, amount: partsByUid[user.id] || ''}))
      .sort((a, b) => (a.amount > b.amount ? -1 : 1))

    initialValues = {
      id: bill.id,
      name: bill.name,
      payer: bill.payer_id,
      paid: bill.paid,
      amount: bill.amount,
      method: 'amounts',
      description: bill.description || '',
      parts,
    }
  } else {
    initialValues = {
      payer: state.member.user.id,
      paid: now,
      method: 'shares',
      parts: state.member.tribe.users.map((user) => ({user_id: user.id, amount: 1})),
    }
  }
  return {
    users: state.member.tribe.users,
    currency: state.member.tribe.currency, //TODO: be able to remove
    lang: state.app.lang, //TODO: be able to remove
    initialValues,
    bill,
  }
}

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return reduxForm({
    form: 'bill',
    fields: ['id', 'name', 'payer', 'paid', 'amount', 'method', 'description', 'parts[].user_id', 'parts[].amount'],
    validate: validator(['name', 'payer', 'amount', 'paid', 'method', 'parts'], ['description']),
    touchOnBlur: (platform === 'web'),
    returnRejectedSubmitPromise: (platform === 'web'),
  }, mapStateToProps, mapDispatchToProps)(component)
}
