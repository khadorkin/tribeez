class Loader {

  constructor() {
    this.scripts = {}
  }

  load(url, callback) {
    if (this.scripts[url]) { // already loaded
      callback()
      return
    }
    this.scripts[url] = true
    const tag = document.createElement('script')
    tag.async = true
    tag.defer = true
    tag.onload = callback
    tag.src = url
    document.body.appendChild(tag)
  }

}

const loader = new Loader()

export default loader
