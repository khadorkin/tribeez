class Loader {

  constructor() {
    this.scripts = {}
  }

  load(url, callback) {
    if (this.scripts[url] === 'loaded') { // already loaded
      if (callback) callback()
      return
    }
    if (this.scripts[url] === 'loading') {
      return
    }
    this.scripts[url] = 'loading'
    const tag = document.createElement('script')
    tag.async = true
    tag.onload = () => {
      this.scripts[url] = 'loaded'
      if (callback) callback()
    }
    tag.src = url
    document.body.appendChild(tag)
  }

}

const loader = new Loader()

export default loader
