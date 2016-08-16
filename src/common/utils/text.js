// get a random string of desired length
export const rand = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return str
}

export const oneLine = (str) => {
  return str.replace(/\n/g, ' ').trim().substr(0, 100)
}
