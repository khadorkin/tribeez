export default (required, optional = []) => {
  return (values) => {
    const errors = {}
    const fields = [...required, ...optional]
    fields.forEach((field) => {
      if (values[field] === undefined) {
        values[field] = null // for Firebase and Redux Form
      }
      if ((values[field] == null || values[field] === '') && !optional.includes(field)) {
        errors[field] = 'empty'
      } else if (field === 'city' && !values.city.place_id) {
        errors.city = 'invalid'
      } else if (field === 'password2' && values.password && values.password2 !== values.password) {
        errors.password2 = 'mismatch'
      } else if (field === 'amount') {
        const amount = Number(values.amount)
        if (isNaN(amount)) {
          errors.amount = 'invalid'
        }
      } else if (field === 'parts') {
        const amount = Number(values.amount)
        const total = values.parts.reduce((prev, curr) => {
          return curr.amount + prev
        }, 0)
        if (values.method === 'shares') {
          if (total <= 0) {
            errors._error = 'no_parts'
          }
        } else {
          if (total !== amount) {
            errors._error = 'amount_mismatch'
          }
        }
      } else if (field === 'users') {
        const notEmpty = values.users.some((task_user) => task_user.checked)
        if (!notEmpty) {
          errors._error = 'no_users'
        }
      } else if (field === 'wait') {
        const wait = Number(values.wait)
        if (isNaN(wait) || wait < 0 || wait > 255 || !Number.isInteger(wait)) {
          errors.wait = 'invalid'
        }
      }
    })
    return errors
  }
}
