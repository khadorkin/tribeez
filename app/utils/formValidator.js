const validator = (required_fields, optional_fields = []) => {
  return (values) => {
    const errors = {}
    required_fields.forEach((field) => {
      if (!values[field]) {
        errors[field] = 'empty'
      } else if (field === 'city' && !values.city.place_id) {
        errors.city = 'invalid'
      }
    })
    optional_fields.forEach((field) => {
      if (field === 'password2' && values.password2 !== values.password) {
        errors.password2 = 'mismatch'
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
}
