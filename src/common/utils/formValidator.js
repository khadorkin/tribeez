export default (required, optional = []) => {
  return (values) => {
    const errors = {}
    const fields = [...required, ...optional]
    fields.forEach((field) => {
      if (values[field] === undefined) {
        values[field] = null // for Firebase
      }
      if ((values[field] == null || values[field] === '') && !optional.includes(field)) {
        errors[field] = 'empty'
      } else if (field === 'city' && !values.city.place_id) {
        errors.city = 'invalid'
      } else if (field === 'password2' && values.password && values.password2 !== values.password) {
        errors.password2 = 'mismatch'
      } else if (field === 'parts') {
        values.amount = Number(values.amount)
        const total = values.parts.reduce((prev, curr) => {
          return curr.amount + prev
        }, 0)
        if (values.method === 'shares') {
          if (total <= 0) {
            errors._error = 'no_parts'
          }
        } else {
          if (total !== values.amount) {
            errors._error = 'amount_mismatch'
          }
        }
      } else if (field === 'users') {
        const notEmpty = values.users.some((task_user) => task_user.checked)
        if (!notEmpty) {
          errors._error = 'no_users'
        }
      } else if (field === 'wait') {
        values.wait = Number(values.wait)
        if (isNaN(values.wait) || values.wait < 0 || values.wait > 255 || !Number.isInteger(values.wait)) {
          errors.wait = 'invalid'
        }
      }
    })
    return errors
  }
}
