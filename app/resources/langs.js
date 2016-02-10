const obj = {
  en: 'English',
  fr: 'Français',
}

// export a sorted array instead of this object:

let arr = []
for (let code in obj) {
  arr.push({code, name: obj[code]})
}

export default arr
