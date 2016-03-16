const normalizers = {
  email: (value) => value && value.toLowerCase(),
  phone: (value) => value && value.replace(/[^\(\)\+\d ]/g, ''),
  amount: (value) => value ? Number(value) : '',
  //parts: (value) => //TODO (see formValidator)
}

export default {
  login: normalizers,
  register: normalizers,
  join: normalizers,
  profile: normalizers,
  invite: normalizers,
  bill: normalizers,
}
