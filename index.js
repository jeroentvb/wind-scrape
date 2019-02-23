const request = require('request')
const puppeteer = require('puppeteer')
const extract = require('./partials/extractData')
const parse = require('./partials/parseData')

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
      .then(data => parse.windfinderData(data))
      .then(windfinder => {
        if (windfinder.spot === '') reject(new Error('The provided windfinder spot doesn\'t exist..'))
        resolve(windfinder)
      })
      .catch(err => reject(err))
  })
}

function windguru (spotnumber, modelNumbers) {
  if (!spotnumber) throw new Error('No spot number specified!')
  if (!modelNumbers) throw new Error('No model numbers specified!')
  if (!Array.isArray(modelNumbers)) throw new Error('Model numbers must be in an array!')

  return new Promise((resolve, reject) => {
    (async function () {
      const browser = await puppeteer.launch({
        args: [
          '--no-sandbox'
        ]
      })
      const page = await browser.newPage()

      try {
        await page.goto(`https://www.windguru.cz/${spotnumber}`, { waitUntil: 'networkidle0' })

        let html = await page.evaluate(() => document.body.innerHTML)
        await browser.close()

        let rawData = extract.windguruData(html, modelNumbers)
        let data = parse.windguruData(rawData)
        resolve(data)
      } catch (err) {
        await browser.close()
        if (err.message === 'waiting for selector ".spot-name" failed: timeout 3000ms exceeded') reject(new Error('The provided windguru spot doesn\'t exist..'))
        reject(err)
      }
    })()
  })
}

function windy (lat, long) {
  if (!lat || !long) throw new Error('No coordinates specified!')

  return new Promise((resolve, reject) => {
    (async function () {
      const browser = await puppeteer.launch({
        args: [
          '--no-sandbox'
        ]
      })
      const page = await browser.newPage()

      try {
        await page.goto(`https://www.windy.com/${lat}/${long}/wind?`, { waitUntil: 'networkidle0' })

        let html = await page.evaluate(() => document.body.innerHTML)
        await browser.close()

        let rawData = extract.windyData(html)
        let data = parse.windyData(rawData)
        resolve(data)
      } catch (err) {
        await browser.close()
        reject(err)
      }
    })()
  })
}

module.exports = {
  windfinder,
  windguru,
  windy
}
