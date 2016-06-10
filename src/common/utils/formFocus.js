export default (errors, refs) => {
  //console.warn('form errors => try to focus on the first one', errors)
  const field = Object.keys(errors)[0]
  if (field !== '_error') {
    const component = refs[field]
    if (component.getWrappedInstance) {
      component.getWrappedInstance().focus()
    } else {
      component.focus()
    }
  } else {
    // go to bottom, where the form error is
    window.scrollTo(0, document.body.scrollHeight)
  }
}
