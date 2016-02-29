const obj = {
  en: 'English',
  fr: 'Français',
}

// export a sorted array instead of this object:

const arr = []
for (const code in obj) {
  arr.push({code, name: obj[code]})
}

export default arr
