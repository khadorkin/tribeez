import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {reduxForm} from 'redux-form'
import validator from '../utils/formValidator'
import platform from '../platform'

const now = Date.now() // need to be called only once, otherwise form reinitializes indefinitely

const mapStateToProps = (state, ownProps) => {
  const bill = state.item.bill || ownProps.current // first from routing state if any, then from ajax retrieval
  let initialValues
  if (bill) {
    const parts = state.tribe.users
      .map((user) => {
        let amount
        if (bill.shares) {
          amount = bill.shares[user.uid] || 0
        } else {
          amount = bill.parts[user.uid] || ''
        }
        return {
          uid: user.uid,
          amount,
        }
      })
      .sort((a, b) => (a.amount > b.amount ? -1 : 1))

    initialValues = {
      id: bill.id,
      name: bill.name,
      description: bill.description,
      payer: bill.payer,
      paid: bill.paid,
      amount: bill.amount,
      method: bill.method,
      parts,
      added: bill.added,
      author: bill.author,
    }
  } else {
    initialValues = {
      payer: state.user.uid,
      paid: now,
      amount: '',
      method: 'shares',
      parts: state.tribe.users.map((user) => ({uid: user.uid, amount: 1})),
      author: state.user.uid,
    }
  }
  return {
    users: state.tribe.users,
    userMap: state.tribe.userMap,
    currency: state.tribe.currency, //TODO: be able to remove
    initialValues,
    bill,
    tid: state.tribe.id,
  }
}

export default (component, actionCreators) => {
  let mapDispatchToProps
  if (actionCreators) {
    mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)
  }
  return connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'bill',
    validate: validator(['name', 'payer', 'amount', 'paid', 'method', 'parts'], ['description']),
    touchOnBlur: (platform === 'web'),
  })(component))
}
