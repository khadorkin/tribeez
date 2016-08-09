const get = (key) => {
  return new Promise((resolve, reject) => {
    if (window.localStorage) {
      resolve(localStorage.getItem(key))
    } else {
      reject('Browser does not support localStorage')
    }
  })
}

const set = (key, val) => {
  return new Promise((resolve, reject) => {
    if (window.localStorage) {
      resolve(localStorage.setItem(key, val))
    } else {
      reject('Browser does not support localStorage')
    }
  })
}

export default {
  get,
  set,
}
