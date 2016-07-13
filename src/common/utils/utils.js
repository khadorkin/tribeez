// limit the number of decimals of a Number
export const decimal = (value, decimals) => {
  const power = Math.pow(10, decimals || 2)
  return Math.round(power * value) / power
}

// get a random string of desired length
export const rand = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return str
}
