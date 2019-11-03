import puppeteer from 'puppeteer'
import extract from './partials/extractData'
import parse from './partials/parseData'
import fetch from 'node-fetch'

async function windfinder (spotname: string) {
  if (!spotname) return new Error('No spot name specified!')
  if (typeof spotname !== 'string') return new TypeError('Spot name must be a string')
  const url = `https://www.windfinder.com/weatherforecast/${spotname}`

  try {
    const res = await fetch(url)
    const html = await res.text()
    const data = extract.windfinderData(html)
    const windfinder = parse.windfinderData(data)

    if (windfinder.spot === '') return new Error('The provided windfinder spot doesn\'t exist..')
    return windfinder
  } catch (err) {
    return err
  }
}

async function windguru (spotnumber: number, modelNumbers: number[]) {
  if (!spotnumber) return new Error('No spot number specified!')
  if (typeof spotnumber !== 'number' && typeof spotnumber !== 'string') return new TypeError('Spotnumber must be a number!')
  if (!modelNumbers) return new Error('No model numbers specified!')
  if (!Array.isArray(modelNumbers)) return new TypeError('Model numbers must be in an array!')

  const url = `https://www.windguru.cz/${spotnumber}`

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox'
    ]
  })
  const page = await browser.newPage()

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })

    const html = await page.evaluate(() => document.body.innerHTML)
    await browser.close()

    const rawData = extract.windguruData(html, modelNumbers)
    let data = parse.windguruData(rawData)
    // data.url = url
    return data
  } catch (err) {
    await browser.close()

    if (err.message === 'waiting for selector ".spot-name" failed: timeout 3000ms exceeded') return new Error('The provided windguru spot doesn\'t exist..')
    if (err.name === 'TimeoutError') return new Error('The request timed out after 30000ms')

    return err
  }
}

async function windy (lat: string | number, long: string | number) {
  if (!lat || !long) return new Error('No coordinates specified!')
  if ((typeof lat !== 'string' && typeof lat !== 'number') || (typeof long !== 'string' && typeof long !== 'number')) return new TypeError('Coordinates must be a string or a number')

  const url = `https://www.windy.com/${lat}/${long}/wind?`

  const browser = await puppeteer.launch({
    args: [
      '--no-sandbox'
    ]
  })
  const page = await browser.newPage()

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })

    let html = await page.evaluate(() => document.body.innerHTML)
    await browser.close()

    const rawData = extract.windyData(html)
    let data = parse.windyData(rawData)
    // data.url = url

    return data
  } catch (err) {
    await browser.close()

    return err
  }
}

async function windReport (spotname: string) {
  if (!spotname) return new Error('No spot specified!')
  if (typeof spotname !== 'string') return new TypeError('Spotname must be a string!')

  const url = `https://www.windfinder.com/report/${spotname}`

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

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })

    await browser.close()

    if (data.report.length < 1) return new Error('The spot doesn\'t exist or doesn\'t have a report')

    const report = parse.reportData(data)

    return report
  } catch (err) {
    await browser.close()

    if (err.name === 'TimeoutError') return new Error('The request timed out after 30000ms')

    return err
  }
}

export default {
  windfinder,
  windguru,
  windy,
  windReport
}
