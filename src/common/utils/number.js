// limit the number of decimals of a Number
export const decimal = (value, decimals) => {
  const power = Math.pow(10, decimals || 2)
  return Math.round(power * value) / power
}
