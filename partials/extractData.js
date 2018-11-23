const utils = require('./utils')
const cheerio = require('cheerio')

function windfinderData (html) {
  let $ = cheerio.load(html)
  let windfinder = {
    name: 'Windfinder',
    spot: '',
    date: [],
    time: [],
    windspeed: [],
    windgust: [],
    winddirection: []
  }

  // Get the spots name
  $('#spotheader-spotname').filter(function () {
    windfinder.spot = $(this).text()
  })

  // Get the dates
  $('.weathertable__header').find($('h4')).filter(function (i) {
    windfinder.date[i] = $(this).text()
  })

  // Get the time
  $('.data-time').find($('.value')).filter(function (i) {
    windfinder.time[i] = $(this).text()
  })
  utils.spliceToDayHours(windfinder.time)

  // Get the average wind speed
  $('.data--major').find($('.units-ws')).filter(function (i) {
    windfinder.windspeed[i] = $(this).text()
  })
  utils.spliceToDayHours(windfinder.windspeed)

  // Get the wind gusts
  $('.data-gusts').find($('.units-ws')).filter(function (i) {
    windfinder.windgust[i] = $(this).text()
  })
  utils.spliceToDayHours(windfinder.windgust)

  // Get the wind direction; do some converting
  $('.data-direction-arrow').find($('.directionarrow')).filter(function (i) {
    var data = parseInt($(this).attr('title').replace('°', ' '))
    // This can be used to calculate the wind direction in wind direction instead of angles
    // var val = Math.floor((data / 22.5) + 0.5)
    // var windDirections = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    // windDirection[i] = windDirections[(val % 16)]
    windfinder.winddirection[i] = data
  })
  utils.spliceToDayHours(windfinder.winddirection)

  return windfinder
}

function windguruModel (number, $) {
  let modelData = {
    name: '',
    time: [],
    windspeed: [],
    windgust: [],
    winddirection: []
  }
  // Get model name
  $(`#wgtab-obal-tabid_${number}`).find('.nadlegend').filter(function () {
    modelData.name = $(this).text()
  })
  // Get time
  $(`#tabid_${number}_0_dates`).find('td').filter(function (i) {
    modelData.time[i] = $(this).text().split('.')[1]
  })

  // Get windspeed
  $(`#tabid_${number}_0_WINDSPD`).find('td').filter(function (i) {
    modelData.windspeed[i] = $(this).text()
  })

  // Get windgust
  $(`#tabid_${number}_0_GUST`).find('td').filter(function (i) {
    modelData.windgust[i] = $(this).text()
  })

  // Get winddirection
  $(`#tabid_${number}_0_SMER`).find('td span').filter(function (i) {
    modelData.winddirection[i] = parseInt($(this).attr('title').match(/\d+/)[0]) - 180
  })

  return modelData
}

function windguruData (html, modelNumbers) {
  let $ = cheerio.load(html)
  let windguru = {
    name: 'WindGuru',
    spot: '',
    // date: [],
    models: []
  }

  // Get spot name
  $('.spot-name').filter(function () {
    windguru.spot = $(this).text()
  })

  modelNumbers.forEach(model => {
    let data = windguruModel(model, $)
    windguru.models.push(data)
  })

  return windguru
}

module.exports = {
  windguruData,
  windfinderData
}
