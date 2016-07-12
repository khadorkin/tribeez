export default (poll, userMap) => {
  const namesByOption = {}

  let total_users_answered = 0
  for (const uid in poll.answers) {
    poll.answers[uid].forEach((option_id) => {
      if (!namesByOption[option_id]) {
        namesByOption[option_id] = []
      }
      namesByOption[option_id].push(userMap[uid].name)
    })
    total_users_answered++
  }

  const results = poll.options.map((name, id) => {
    const names = namesByOption[id] || []
    return {
      id,
      name,
      users: names,
      percent: Math.round((100 * names.length / total_users_answered) || 0),
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
