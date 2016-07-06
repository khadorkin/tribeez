const getItem = (key) => {
  return new Promise((resolve, reject) => {
    const value = localStorage.getItem(key)
    if (value == null) {
      reject()
    } else {
      resolve(value)
    }
  })
}

const setItem = (key, value) => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.setItem(key, value)
      resolve()
    } catch (err) {
      reject(err)
    }
  })
}

export default {
  getItem,
  setItem,
}
