const required_fields = {
  register: ['name', 'email', 'password', 'lang', 'tribe_name', 'tribe_type', 'city', 'currency', 'captcha'],
  join: ['name', 'email', 'password', 'lang'],
}

const formValidator = (name, values) => {
  const errors = {_front: true}
  required_fields[name].forEach((field) => {
    if (!values[field]) {
      errors[field] = 'empty'
    } else if (field === 'city' && !values[field].place_id) {
      errors.city = 'invalid'
    }
  })
  return Object.keys(errors).length > 1 ? errors : null
}

export default formValidator
