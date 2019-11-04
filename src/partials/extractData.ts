import cheerio from 'cheerio'

import { ExtractedWindfinderData } from '../interfaces/data/windfinder'
import { ExtractedWindguruData, ExtractedWindguruModelData } from '../interfaces/data/windguru'
import { ExtractedWindyData } from '../interfaces/data/windy'

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
    temperature: []
  }

  // Get the spots name
  $('#spotheader-spotname').each(function () {
    data.spot = $(this).text()
  })

  // Get the dates
  $('.weathertable__header').find($('h4')).each(function (i) {
    data.date[i] = $(this).text()
  })

  // Get the time
  $('.data-time').find($('.value')).each(function (i) {
    data.time[i] = parseInt($(this).text().replace('h', ''))
  })

  // Get the average wind speed
  $('.data--major').find($('.units-ws')).each(function (i) {
    data.windspeed[i] = parseInt($(this).text())
  })

  // Get the wind gusts
  $('.data-gusts').find($('.units-ws')).each(function (i) {
    data.windgust[i] = parseInt($(this).text())
  })

  // Get the wind direction; do some converting
  $('.units-wd-sym').find($('.directionarrow')).each(function (i) {
    let direction = parseInt($(this).attr('title').replace('°', ' '))
    // This can be used to calculate the wind direction in wind direction instead of angles
    // var val = Math.floor((data / 22.5) + 0.5)
    // var windDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    // windDirection[i] = windDirections[(val % 16)]
    data.winddirection[i] = direction
  })

  // Get temperature
  $('.data-temp').find($('.units-at')).each(function (i) {
    data.temperature[i] = parseInt($(this).text())
  })

  return data
}

function windguruModel (number: number, $: CheerioStatic): ExtractedWindguruModelData {
  let modelData: ExtractedWindguruModelData = {
    name: '',
    lastUpdate: '',
    nextUpdate: '',
    number: number,
    time: [],
    windspeed: [],
    windgust: [],
    winddirection: [],
    temperature: []
  }

  // Get model name
  $(`#wgtab-obal-tabid_${number}`).find('.nadlegend').each(function () {
    modelData.name = $(this).text()
  })

  // Get last update time
  $(`#wgtab-obal-tabid_${number}`).find('.model-update-info').each(function (i) {
    if (i === 0) {
      modelData.lastUpdate = $(this).find('br').get(4).nextSibling.nodeValue.replace('. ', ' ')
      modelData.nextUpdate = $(this).find('br').get(6).nextSibling.nodeValue.replace('. ', ' ')
    }
  })

  // Get time
  $(`#tabid_${number}_0_dates`).find('td:not(.spacer)').each(function (i) {
    modelData.time[i] = $(this).text().substring(2)
  })

  // Get windspeed
  $(`#tabid_${number}_0_WINDSPD`).find('td').each(function (i) {
    modelData.windspeed[i] = parseInt($(this).text())
  })

  // Get windgust
  $(`#tabid_${number}_0_GUST`).find('td').each(function (i) {
    modelData.windgust[i] = parseInt($(this).text())
  })

  // Get winddirection
  $(`#tabid_${number}_0_SMER`).find('td span').each(function (i) {
    modelData.winddirection[i] = parseInt($(this).attr('title').match(/\d+/)[0])
  })

  // Get temperature
  if ($(`#tabid_${number}_0_TMPE`).length < 1) {
    $(`#tabid_${number}_0_TMP`).find('td').each(function (i) {
      modelData.temperature[i] = parseInt($(this).text())
    })
  } else {
    $(`#tabid_${number}_0_TMPE`).find('td').each(function (i) {
      modelData.temperature[i] = parseInt($(this).text())
    })
  }

  return modelData
}

function windguruData (html: string, modelNumbers: number[]): ExtractedWindguruData {
  let $ = cheerio.load(html)
  let windguru: ExtractedWindguruData = {
    name: 'WindGuru',
    spot: '',
    // date: [],
    models: []
  }

  // Get spot name
  $('.spot-name').each(function () {
    windguru.spot = $(this).text()
  })

  modelNumbers.forEach(model => {
    let data = windguruModel(model, $)

    if (data.name !== '' && data.windspeed.length >= 0) {
      windguru.models.push(data)
    } else {
      console.error(`[Wind-scrape] model number ${model} doesn't exist for windguru spot ${windguru.spot}`)
    }
  })

  return windguru
}

function windyData (html: string): ExtractedWindyData {
  let $ = cheerio.load(html)
  let hours = []
  let windy: ExtractedWindyData = {
    name: 'Windy',
    date: [],
    models: []
  }

  // Get dates
  $('.sticky-title-wrapper', '.td-days').each(function () {
    windy.date.push($(this).data('day'))
  })

  // Get model names
  $('.legend-windCombined', '.legend').find('.legend-left').each(function () {
    windy.models.push({
      name: $(this).text()
    })
  })

  // get model times
  $('td', '.td-hour').each(function () {
    hours.push(parseInt($(this).text()))
  })
  windy.models.forEach(model => {
    model.time = hours
  })

  // get windspeed, windgust and winddirection
  $('.td-windCombined', '#detail-data-table').each(function (i) {
    windy.models[i].windspeed = []
    windy.models[i].windgust = []
    windy.models[i].winddirection = []

    $(this).find('td').each(function () {
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
