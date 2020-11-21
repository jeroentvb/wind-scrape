import cheerio from 'cheerio'

import { ExtractedWindyData } from '../interfaces/windy'

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
  windyData
}
