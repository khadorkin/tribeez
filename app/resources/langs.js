export const map = {
  en: 'English',
  fr: 'Français',
}

// export a sorted array instead of this object:

export const list = []
for (const code in map) {
  list.push({code, name: map[code]})
}
