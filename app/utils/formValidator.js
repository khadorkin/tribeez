const validator = (required, optional = []) => {
  return (values) => {
    const errors = {}
    const fields = [...required, ...optional]
    fields.forEach((field) => {
      if (!values[field] && !optional.includes(field)) {
        errors[field] = 'empty'
      } else if (field === 'city' && !values.city.place_id) {
        errors.city = 'invalid'
      } else if (field === 'password2' && values.password2 !== values.password) {
        errors.password2 = 'mismatch'
      } else if (field === 'parts') {
        const total = values.parts.reduce((prev, curr) => {
          curr.amount = Number(curr.amount)
          return curr.amount + prev
        }, 0)
        if (values.amount !== total) { //values.amount is casted in normalizer
          errors.amount = 'mismatch'
        }
      }
    })
    return errors
  }
}

export default {
  register: validator(['name', 'email', 'password', 'lang', 'tribe_name', 'tribe_type', 'city', 'currency', 'captcha']),
  join: validator(['name', 'email', 'password', 'lang']),
  login: validator(['email', 'password']),
  password: validator(['email', 'lang']),
  profile: validator(['name', 'email', 'lang'], ['birthdate', 'phone', 'password', 'password2']),
  tribe: validator(['tribe_name', 'tribe_type', 'city', 'currency']),
  invite: validator(['email', 'lang']),
  reset: validator(['password', 'password2']),
  bill: validator(['name', 'payer', 'amount', 'parts'], ['description']),
}
