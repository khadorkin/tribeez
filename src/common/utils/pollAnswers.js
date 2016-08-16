export default (poll, userMap) => {
  const usersByOption = {}

  let total_users_answered = 0
  for (const uid in poll.answers) {
    const user_answers = poll.answers[uid]
    for (const option_id in user_answers) {
      if (!usersByOption[option_id]) {
        usersByOption[option_id] = []
      }
      usersByOption[option_id].push(userMap[uid])
    }
    total_users_answered++
  }

  const results = poll.options.map((name, id) => {
    const users = usersByOption[id] || []
    return {
      id,
      name,
      users,
      percent: Math.round((100 * users.length / total_users_answered) || 0),
    }
  })
  .sort((a, b) => {
    if (a.percent === b.percent) {
      return 0
    }
    return a.percent > b.percent ? -1 : 1
  })// from bigger to smaller

  return results
}
