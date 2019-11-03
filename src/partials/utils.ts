function one (array: number[]) {
  return array.slice(7, 23)
}

function two (array: number[]) {
  return array.slice(31, 47)
}

function three (array: number[]) {
  return array.slice(55, 70)
}

function reverseDate (date: string) {
  return date.split('-').reverse().join('-')
}

export default {
  sliceDay: {
    one,
    two,
    three
  },
  reverseDate
}
