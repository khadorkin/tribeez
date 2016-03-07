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
      } else if (field === 'phone' && !/^[\+\(\)0-9 ]+$/.test(values.phone)) {
        errors.phone = 'invalid'
      }
    })
    return errors
  }
}

export default {
  register: validator(['name', 'email', 'password', 'lang', 'tribe_name', 'tribe_type', 'city', 'currency', 'captcha']),
  join: validator(['name', 'email', 'password', 'lang']),
  profile: validator(['name', 'email', 'lang'], ['birthdate', 'phone', 'password', 'password2']),
}
