function one (array) {
  return array.slice(7, 23)
}

function two (array) {
  return array.slice(31, 47)
}

function three (array) {
  return array.slice(55, 70)
}

function reverseDate (date) {
  return date.split('-').reverse().join('-')
}

module.exports = {
  sliceDay: {
    one,
    two,
    three
  },
  reverseDate
}
