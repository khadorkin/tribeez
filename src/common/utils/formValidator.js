const validator = (required, optional = []) => {
  return (values) => {
    const errors = {}
    const fields = [...required, ...optional]
    fields.forEach((field) => {
      if (!values[field] && !optional.includes(field)) {
        errors[field] = 'empty'
      } else if (field === 'city' && !values.city.place_id) {
        errors.city = 'invalid'
      } else if (field === 'password2' && values.password && values.password2 !== values.password) {
        errors.password2 = 'mismatch'
      } else if (field === 'parts') {
        values.amount = Number(values.amount)
        const total = values.parts.reduce((prev, curr) => {
          curr.amount = Number(curr.amount)
          return curr.amount + prev
        }, 0)
        if (values.method === 'shares') {
          if (total <= 0) {
            errors._error = 'no_parts'
          }
        }
      } else if (field === 'wait') {
        values.wait = Number(values.wait)
        if (isNaN(values.wait) || values.wait < 0) {
          errors.wait = 'invalid'
        }
      } else if (field === 'notice') {
        values.notice = Number(values.notice)
        if (isNaN(values.notice) || values.notice < 0) {
          errors.notice = 'invalid'
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
  bill: validator(['name', 'payer', 'amount', 'paid', 'method', 'parts'], ['description']),
  event: validator(['name', 'start'], ['end', 'description', 'location', 'url']),
  poll: validator(['name', 'options'], ['description', 'multiple']),
  task: validator(['name', 'wait', 'notice'], ['description']),
}

export const focus = (errors, refs) => {
  const field = Object.keys(errors)[0]
  if (field !== '_error') {
    const component = refs[field]
    if (component.getWrappedInstance) {
      component.getWrappedInstance().focus()
    } else {
      component.focus()
    }
  } else {
    // go to bottom, where the form error is
    window.scrollTo(0, document.body.scrollHeight)
  }
}

export const modified = (fields) => {
  for (const field in fields) {
    if ((fields[field].value || '') !== (fields[field].initialValue || '')) {
      return true
    }
  }
  return false
}