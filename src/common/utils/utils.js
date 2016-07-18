import moment from 'moment'

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

export const getTimeId = (timestamp, reminder) => {
  const mm = moment.utc(timestamp)

  const date = new Date(timestamp)
  const offset = Math.round(date.getTimezoneOffset() / 60)

  mm.subtract(Number(reminder[0]), reminder[1]) // e.g. (2, 'd') for 2 days

  if (reminder[1] === 'd') {
    mm.hours(9 + offset) // remind at 9am for x-days-before reminders
    mm.minutes(0)
  } else {
    mm.minutes(mm.minutes() - mm.minutes() % 15) // to match UTC_OFFSET_STEP in API
  }

  return mm.format('YYYY-MM-DD@HH:mm')
}
