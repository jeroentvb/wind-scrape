const request = require('request')
const Nightmare = require('nightmare')
const extract = require('./partials/extractData')

function getHtml (url) {
  return new Promise((resolve, reject) => {
    request(url, (err, res, html) => {
      if (err) reject(err)
      resolve(html)
    })
  })
}

function windfinder (spotname) {
  if (!spotname) throw new Error('No spot specified!')
  return new Promise((resolve, reject) => {
    getHtml(`https://www.windfinder.com/weatherforecast/${spotname}`)
      .then(html => extract.windfinderData(html))
      .then(windfinder => resolve(windfinder))
      .catch(err => reject(err))
  })
}

function windguru (spotnumber, modelNumbers) {
  if (!spotnumber) throw new Error('No spot number specified!')
  if (!modelNumbers) throw new Error('No model numbers specified!')
  if (!Array.isArray(modelNumbers)) throw new Error('Model numbers must be in an array!')
  const nightmare = Nightmare({
    show: false
  })
  return new Promise((resolve, reject) => {
    nightmare
      .goto(`https://www.windguru.cz/${spotnumber}`)
      .wait('.spot-name')
      .wait('#tabid_2_0_dates')
      .wait('#tabid_2_0_WINDSPD')
      .wait('#tabid_2_0_GUST')
      .wait('#tabid_2_0_SMER')
      .evaluate(() => document.querySelector('body').outerHTML)
      .end()
      .then(html => extract.windguruData(html, modelNumbers))
      .then(windguru => resolve(windguru))
      .catch(err => reject(err))
  })
}

function windy (lat, long) {
  if (!lat || !long) throw new Error('No coordinates specified!')
  const nightmare = Nightmare({
    show: false
  })
  return new Promise((resolve, reject) => {
    nightmare
      .goto(`https://www.windy.com/${lat}/${long}/wind?`)
      .wait('.legend-left')
      .evaluate(() => document.querySelector('body').outerHTML)
      .end()
      .then(html => extract.windyData(html))
      .then(windy => resolve(windy))
      .catch(err => reject(err))
  })
}

module.exports = {
  windfinder,
  windguru,
  windy
}
