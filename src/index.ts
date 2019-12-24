import puppeteer from 'puppeteer'
import extract from './partials/extractData'
import parse from './partials/parseData'
import fetch from 'node-fetch'

import { WindfinderData } from './interfaces/windfinder'
import { WindguruData } from './interfaces/windguru'
import { WindyData } from './interfaces/windy'
import { WindReport, ExtractedWindReport } from './interfaces/wind-report'

async function windfinder (spotname: string): Promise<WindfinderData> {
  if (!spotname) throw new Error('No spot name specified!')
  if (typeof spotname !== 'string') throw new TypeError('Spot name must be a string')
  const url = `https://www.windfinder.com/weatherforecast/${spotname}`

  try {
    const res = await fetch(url)
    const html = await res.text()
    const data = extract.windfinderData(html)
    const windfinder = parse.windfinderData(data)

    if (windfinder.spot === '') throw new Error('The provided windfinder spot doesn\'t exist..')
    return windfinder
  } catch (err) {
    return err
  }
}

async function windguru (spotnumber: number | string, modelNumbers: number[]): Promise<WindguruData | Error> {
  if (!spotnumber) throw new Error('No spot number specified!')
  if (typeof spotnumber !== 'number' && typeof spotnumber !== 'string') throw new TypeError('Spotnumber must be a number!')
  if (!modelNumbers) throw new Error('No model numbers specified!')
  // if (!Array.isArray(modelNumbers)) throw new TypeError('Model numbers must be in an array!')

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
    data.url = url

    return data
  } catch (err) {
    await browser.close()

    if (err.message === 'waiting for selector ".spot-name" failed: timeout 3000ms exceeded') return new Error('The provided windguru spot doesn\'t exist..')
    if (err.name === 'TimeoutError') return new Error('The request timed out after 30000ms')

    return err
  }
}

async function windy (lat: string | number, long: string | number): Promise<WindyData | Error> {
  if (!lat || !long) throw new Error('No coordinates specified!')
  if ((typeof lat !== 'string' && typeof lat !== 'number') || (typeof long !== 'string' && typeof long !== 'number')) throw new TypeError('Coordinates must be a string or a number')

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
    data.url = url

    return data
  } catch (err) {
    await browser.close()

    if (err.name === 'TimeoutError') return new Error('The request timed out after 30000ms')

    return err
  }
}

async function windReport (spotname: string): Promise<WindReport | Error> {
  if (!spotname) throw new Error('No spot specified!')
  if (typeof spotname !== 'string') throw new TypeError('Spotname must be a string!')

  const url = `https://www.windfinder.com/report/${spotname}`

  let data: ExtractedWindReport = {
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
    page.on('response', async res => {
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

export {
  windfinder,
  windguru,
  windy,
  windReport
}
