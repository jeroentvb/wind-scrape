import { ExtractedWindfinderData, ParsedWindfinderDay } from '../interfaces/windfinder'
import { SpotInfo } from '../interfaces/windguru'


function reverseDate (date: string) {
  return date.split('-').reverse().join('-')
}

function parseSpotInfo (str: string): SpotInfo {
  const spotData =  str
    .split(',')
    .map(item => item.trim())
    .map(item => (item.split(':')[1] ? item.split(':')[1] : item.split(':')[0]).trim())

  return {
    name: spotData[0],
    coordinates: {
      lat: spotData[1],
      lng: spotData[2]
    },
    altitude: spotData[3],
    temperature: spotData[4]
  }
}

function parseModelInfo (str: string): string {
  return str.split('(')[0].trim()
}
 
function parseLegend (str: string): string[] {
  return str.split(' ').filter(item => item).map(item => item.toLocaleLowerCase())
}

function getDate (str: string): string {
  return str.split(' ').splice(0, 2).join(' ').replace('.', '')
}

function getHour (str: string): string {
  return str.split(' ')[2].replace('h', '')
}

function createRequestUrl (spot: number | string): string {
  return `http://micro.windguru.cz/?s=${spot}&m=all`
}

export default {
  reverseDate,
  windguru: {
    parseSpotInfo,
    parseModelInfo,
    parseLegend,
    getDate,
    getHour
  },
  createRequestUrl
}
