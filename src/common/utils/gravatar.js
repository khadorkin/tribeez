import md5 from 'md5'

export default (user, size = 40) => {
  if (!user) {
    return null
  }
  if (!user.gravatar) {
    user.gravatar = md5(user.email)
  }
  return `https://secure.gravatar.com/avatar/${user.gravatar}?d=retro&s=${size}`
}
