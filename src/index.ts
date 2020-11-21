import puppeteer from 'puppeteer'
import fetch from 'node-fetch'
import extract from './partials/extract-data'
import parse from './partials/parser'
import utils from './partials/utils'

import fs from 'fs'

import { WindfinderData } from './interfaces/windfinder'
import { WindguruData } from './interfaces/windguru'
import { WindyData } from './interfaces/windy'
import { WindReport, ExtractedWindReport } from './interfaces/wind-report'
import Windfinder from './partials/windfinder'

async function windfinder (spotname: string): Promise<WindfinderData> {
  if (!spotname) throw new Error('No spot name specified!')
  if (typeof spotname !== 'string') throw new TypeError('Spot name must be a string')
  const url = `https://www.windfinder.com/weatherforecast/${spotname}`

  try {
    // const res = await fetch(url)
    // const html = await res.text()
    
    const html = fs.readFileSync('html-export.txt', 'utf8')

    const data = new Windfinder(html)
      .extract()
      .parse()
      .get()

    if (data.spot === '') throw new Error('The provided windfinder spot doesn\'t exist..')
    return data
  } catch (err) {
    throw err
  }
}

async function windguru (spot: number | string): Promise<WindguruData> {
  if (!spot) throw new Error('No spot number specified!')
  if (typeof spot !== 'number' && typeof spot !== 'string') throw new TypeError('Spotnumber must be a number or a string!')

  const url = utils.createRequestUrl(spot)

  try {
    const res = await fetch(url)
    const html = await res.text()

    const extractedData = extract.windguruData(html)
    const data = parse.windguru(extractedData)

    return data
  } catch (err) {
    throw err
  }
}

async function windy (lat: string | number, long: string | number): Promise<WindyData | Error> {
  if (!lat || !long) throw new Error('No coordinates specified!')
  if ((typeof lat !== 'string' && typeof lat !== 'number') || (typeof long !== 'string' && typeof long !== 'number')) throw new TypeError('Coordinates must be a string or a number')

  const url = `https://www.windy.com/${lat}/${long}/wind?`

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })

    let html = await page.evaluate(() => document.body.innerHTML)
    await browser.close()

    const rawData = extract.windyData(html)
    let data = parse.windy(rawData)
    data.url = url

    return data
  } catch (err) {
    await browser.close()

    if (err.name === 'TimeoutError') throw new Error('The request timed out after 30000ms')

    throw err
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
  const browser = await puppeteer.launch()
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

    const report = parse.windReport(data)

    return report
  } catch (err) {
    await browser.close()

    if (err.name === 'TimeoutError') throw new Error('The request timed out after 30000ms')

    throw err
  }
}

export {
  windfinder,
  windguru,
  windy,
  windReport,
  WindfinderData,
  WindguruData,
  WindyData,
  WindReport
}
