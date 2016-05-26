const normalizers = {
  email: (value) => value && value.toLowerCase(),
  phone: (value) => value && value.replace(/[^\(\)\+\d ]/g, ''),
}

export default {
  login: normalizers,
  register: normalizers,
  join: normalizers,
  profile: normalizers,
  invite: normalizers,
}
