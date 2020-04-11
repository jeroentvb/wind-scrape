import cheerio from 'cheerio'

import utils from './utils'

import { ExtractedWindfinderData } from '../interfaces/windfinder'
import { SpotInfo, ExtractedWindguruData, ExtractedWindguruModelData } from '../interfaces/windguru'
import { ExtractedWindyData } from '../interfaces/windy'

function windfinderData (html: string): ExtractedWindfinderData {
  let $ = cheerio.load(html)

  let data: ExtractedWindfinderData = {
    name: 'Windfinder',
    spot: '',
    date: [],
    time: [],
    windspeed: [],
    windgust: [],
    winddirection: [],
    temperature: [],
    wavedirection: [],
    waveheight: [],
    waveinterval: []
  }

  // Get the spots name
  $('#spotheader-spotname').each(function (this: CheerioElement) {
    data.spot = $(this).text()
  })

  // Get the dates
  $('.weathertable__header').find($('h4')).each(function (this: CheerioElement, i) {
    data.date[i] = $(this).text()
  })

  // Get the time
  $('.data-time').find($('.value')).each(function (this: CheerioElement, i) {
    data.time[i] = parseInt($(this).text().replace('h', ''))
  })

  // Get the average wind speed
  $('.data--major').find($('.units-ws')).each(function (this: CheerioElement, i) {
    data.windspeed[i] = parseInt($(this).text())
  })

  // Get the wind gusts
  $('.data-gusts').find($('.units-ws')).each(function (this: CheerioElement, i) {
    data.windgust[i] = parseInt($(this).text())
  })

  // Get the wind direction; do some converting
  $('.units-wd-sym').find($('.directionarrow')).each(function (this: CheerioElement, i) {
    const direction = parseInt(($(this).attr('title') as string).replace('°', ' '))
    // This can be used to calculate the wind direction in wind direction instead of angles
    // var val = Math.floor((data / 22.5) + 0.5)
    // var windDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    // windDirection[i] = windDirections[(val % 16)]
    data.winddirection[i] = direction
  })

  // Get temperature
  $('.data-temp').find($('.units-at')).each(function (this: CheerioElement, i) {
    data.temperature[i] = parseInt($(this).text())
  })

  // Get wave direction
  $('.units-wad-sym').find($('.directionarrow')).each(function (this: CheerioElement, i) {
    const direction = parseInt(($(this).attr('title') as string).replace('°', ' '))

    data.wavedirection[i] = direction
  })

  // Get wave height
  $('.data-waveheight').find($('.units-wh')).each(function (this: CheerioElement, i) {
    console.log(parseFloat($(this).text()))
    data.waveheight[i] = parseFloat($(this).text())
  })

  // Get wave interval
  $('.data-wavefreq').each(function (this: CheerioElement, i) {
    data.waveinterval[i] = parseInt($(this).text())
  })

  // console.log(data)

  return data
}

function windguruData (data: string): ExtractedWindguruData {
  let foundPre = false
  let spot: SpotInfo = {
    name: '',
    coordinates: {
      lat: '',
      lng: ''
    },
    altitude: '',
    temperature: ''
  }
  
  const filteredData = data
    .split('\n')
    // Get the data from the HTML
    .filter(row => {
      if (row.includes('</pre>')) foundPre = false

      if (foundPre && row !== '') return true

      if (row.includes('<pre>')) foundPre = true
    })
    // Filter unneeded rows from the data, including the spot info
    .filter((row, i) => {
      if (i === 1) spot = utils.windguru.parseSpotInfo(row)
      if (i < 2) return false
      return true
    })
  
  // Group the modeldata in its own object
  const rawData = extractWindguruModel(filteredData)

  const models = rawData.map((modelData): ExtractedWindguruModelData => {
    let modelInfo: string = ''
    let legend: string[] = []

    // Filter the modelInfo and legend from the data
    const extractedModelData = modelData.filter((row, i) => {
      if (i === 0) modelInfo = utils.windguru.parseModelInfo(row)
      if (i === 1) legend = utils.windguru.parseLegend(row)

      if (i < 3) return

      return true
    })
    // Split the rows into an array of data
    .map(row => {
      return row
        .trim()
        .split(/  +/g)
    })
    // Transform the array of values into an object
    .map(values => {
      const dataObj: {[key: string]: any} = {}

      legend.forEach((item, i) => {
        dataObj[item] = values[i]
      })

      return dataObj
    })

    return {
      name: modelInfo,
      data: extractedModelData
    }
  })

  return {
    spot,
    models
  }
}

function extractWindguruModel (data: string[]): string[][] {
  let extractedData: string[][] = []
  let index = -1

  data.forEach(row => {
    if (row[0] !== ' ') {
      index++
      extractedData[index] = []
    }

    extractedData[index].push(row)
  })

  return extractedData
}

function windyData (html: string): ExtractedWindyData {
  let $ = cheerio.load(html)
  const hours: number[] = []
  const windy: ExtractedWindyData = {
    name: 'Windy',
    date: [],
    models: []
  }

  // Get dates
  $('.sticky-title-wrapper', '.td-days').each(function (this: CheerioElement) {
    windy.date.push($(this).data('day'))
  })

  // Get model names
  $('.legend-windCombined', '.legend').find('.legend-left').each(function (this: CheerioElement) {
    windy.models.push({
      name: $(this).text(),
      time: [],
      windspeed: [],
      windgust: [],
      winddirection: []
    })
  })

  // get model times
  $('td', '.td-hour').each(function (this: CheerioElement) {
    hours.push(parseInt($(this).text()))
  })
  windy.models.forEach(model => {
    model.time = hours
  })

  // get windspeed, windgust and winddirection
  $('.td-windCombined', '#detail-data-table').each(function (this: CheerioElement, i) {
    windy.models[i].windspeed = []
    windy.models[i].windgust = []
    windy.models[i].winddirection = []

    $(this).find('td').each(function (this: CheerioElement) {
      let winddirection = parseInt($(this).find('div').css('transform').replace(/\D/g, ''))
      let windgust = parseInt($(this).find('small').text())
      $(this).children().remove().end()
      let windspeed = parseInt($(this).text())

      windy.models[i].windspeed.push(windspeed)
      windy.models[i].windgust.push(windgust)
      windy.models[i].winddirection.push(winddirection)
    })
  })

  return windy
}

export default {
  windguruData,
  windfinderData,
  windyData
}
