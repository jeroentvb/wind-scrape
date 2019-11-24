import { ExtractedWindfinderData, ParsedWindfinderDay } from '../interfaces/data/windfinder'

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

const sliceDay = {
  one,
  two,
  three
}

function getWindfinderDay (data: ExtractedWindfinderData, day: 'one' | 'two' | 'three'): ParsedWindfinderDay {
  const dayNum = day === 'one' ? 1 : (day === 'two' ? 2 : 3)

  return {
    date: data.date[dayNum],
    time: sliceDay[day](data.time),
    windspeed: sliceDay[day](data.windspeed),
    windgust: sliceDay[day](data.windgust),
    winddirection: sliceDay[day](data.winddirection),
    temperature: sliceDay[day](data.temperature)
  }
}

export default {
  sliceDay,
  reverseDate,
  getWindfinderDay
}
