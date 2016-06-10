export default (poll, users) => {
  const users_map = {}
  users.forEach((user) => {
    users_map[user.id] = user
  })

  const author = users_map[poll.author_id]

  const namesByOption = {}

  let total = 0
  for (const uid in poll.answers) {
    poll.answers[uid].forEach((option_id) => {
      if (!namesByOption[option_id]) {
        namesByOption[option_id] = []
      }
      namesByOption[option_id].push(users_map[uid].name)
    })
    total++
  }

  const results = poll.options.map((option) => {
    const names = namesByOption[option.id] || []
    return {
      id: option.id,
      name: option.name,
      users: names,
      percent: Math.round((100 * names.length / total) || 0),
    }
  })
  .sort((a, b) => {
    if (a.percent === b.percent) {
      return 0
    }
    return a.percent > b.percent ? -1 : 1 // from bigger to smaller
  })

  return {
    author,
    total,
    results,
  }
}
