import moment from 'moment'

export const reminderTimeId = (timestamp, reminder) => {
  const mm = moment.utc(timestamp, typeof timestamp === 'string' ? 'YYYY-MM-DD' : null)

  mm.subtract(Number(reminder[0]), reminder[1]) // e.g. (2, 'd') for 2 days

  if (reminder[1] === 'd') {
    const offset = Math.round(moment().utcOffset() / 60)
    mm.hours(9 - offset) // remind at 9am for x-days-before reminders
    mm.minutes(0)
  } else {
    mm.minutes(mm.minutes() - mm.minutes() % 15) // to match UTC_OFFSET_STEP in API
  }

  return mm.format('YYYY-MM-DD@HH:mm')
}

export const storedTime = (timestamp) => {
  const mm = moment(timestamp)
  if (mm.hours() === 0 && mm.minutes() === 0) {
    return mm.format('YYYY-MM-DD')
  } else {
    return timestamp
  }
}

export const getTimestamp = (input) => {
  if (typeof input === 'string') {
    return moment(input, 'YYYY-MM-DD').valueOf()
  }
  if (typeof input === 'object' && input.valueOf) {
    return input.valueOf() // for moment or Date
  }
  return input
}
