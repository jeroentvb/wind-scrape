const puppeteer = require('puppeteer')
const extract = require('./partials/extractData')
const parse = require('./partials/parseData')
const fetch = require('node-fetch')

function windfinder (spotname) {
  if (!spotname) throw new Error('No spot specified!')
  const url = `https://www.windfinder.com/weatherforecast/${spotname}`

  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url)
      const html = await res.text()
      const data = extract.windfinderData(html)
      const windfinder = parse.windfinderData(data)

      if (windfinder.spot === '') reject(new Error('The provided windfinder spot doesn\'t exist..'))
      resolve(windfinder)
    } catch (err) {
      reject(err)
    }
  })
}

function windguru (spotnumber, modelNumbers) {
  if (!spotnumber) throw new Error('No spot number specified!')
  if (!modelNumbers) throw new Error('No model numbers specified!')
  if (!Array.isArray(modelNumbers)) throw new Error('Model numbers must be in an array!')

  const url = `https://www.windguru.cz/${spotnumber}`

  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox'
      ]
    })
    const page = await browser.newPage()

    try {
      await page.goto(url, { waitUntil: 'networkidle0' })

      const html = await page.evaluate(() => document.body.innerHTML)
      await browser.close()

      const rawData = extract.windguruData(html, modelNumbers)
      let data = parse.windguruData(rawData)
      data.url = url
      resolve(data)
    } catch (err) {
      await browser.close()

      if (err.message === 'waiting for selector ".spot-name" failed: timeout 3000ms exceeded') reject(new Error('The provided windguru spot doesn\'t exist..'))
      if (err.name === 'TimeoutError') reject(new Error('The request timed out after 30000ms'))

      reject(err)
    }
  })
}

function windy (lat, long) {
  if (!lat || !long) throw new Error('No coordinates specified!')

  const url = `https://www.windy.com/${lat}/${long}/wind?`

  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox'
      ]
    })
    const page = await browser.newPage()

    try {
      await page.goto(url, { waitUntil: 'networkidle0' })

      let html = await page.evaluate(() => document.body.innerHTML)
      await browser.close()

      const rawData = extract.windyData(html)
      let data = parse.windyData(rawData)
      data.url = url

      resolve(data)
    } catch (err) {
      await browser.close()

      reject(err)
    }
  })
}

function report (spotname) {
  if (!spotname) throw new Error('No spot specified!')
  const url = `https://www.windfinder.com/report/${spotname}`

  return new Promise(async (resolve, reject) => {
    let data = {
      name: 'Windfinder report',
      spot: spotname,
      report: []
    }
    const browser = await puppeteer.launch({
      args: [
        '--no-sandbox'
      ]
    })
    const page = await browser.newPage()

    try {
      await page.on('response', async res => {
        if (res.url().includes('https://api.windfinder.com/v2/spots') && res.url().includes('reports')) {
          data.report = await res.json()
        }
      })

      await page.goto(url, { waitUntil: 'networkidle0' })

      await browser.close()

      if (data.report < 1) return reject(new Error('The spot doesn\'t exist or doesn\'t have a report'))

      const report = parse.reportData(data)

      resolve(report)
    } catch (err) {
      await browser.close()

      if (err.name === 'TimeoutError') reject(new Error('The request timed out after 30000ms'))

      reject(err)
    }
  })
}

module.exports = {
  windfinder,
  windguru,
  windy,
  report
}
