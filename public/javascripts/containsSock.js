function containsSock(obj, list) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === obj) {
      return true
    }
  }
  return false
}

module.exports = containsSock
