const ERR = 'Browser does not support localStorage'

const get = (key) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(localStorage.getItem(key))
    } catch (err) {
      reject(ERR)
    }
  })
}

const set = (key, val) => {
  return new Promise((resolve, reject) => {
    try {
      resolve(localStorage.setItem(key, val))
    } catch (err) {
      reject(ERR)
    }
  })
}

export default {
  get,
  set,
}
