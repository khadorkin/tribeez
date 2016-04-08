export const map = {
  en: 'English',
  fr: 'Français',
}

// export an array:
const list = []
for (const code in map) {
  list.push({code, name: map[code]})
}

export default list
