export default (fields) => {
  for (const field in fields) {
    if ((fields[field].value || '') !== (fields[field].initialValue || '')) {
      console.log('changed:', fields[field])
      return false
    }
  }
  console.log('no change', fields)
  return true
}
