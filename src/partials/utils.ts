function reverseDate (date: string) {
  return date.split('-').reverse().join('-')
}

export default {
  reverseDate
}
