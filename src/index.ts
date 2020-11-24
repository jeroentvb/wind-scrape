import puppeteer from 'puppeteer'
import fetch from 'node-fetch'

import fs from 'fs'

import { WindfinderData } from './interfaces/windfinder'
import { WindguruData } from './interfaces/windguru'
import { WindyData } from './interfaces/windy'
import { WindReport, ExtractedWindReport } from './interfaces/wind-report'
import Windfinder from './partials/windfinder'
import Windguru from './partials/windguru'
import UrlBuilder from './partials/url-builder'
import Windy from './partials/windy'
import Report from './partials/windfinder-report'

async function windfinder (spotname: string): Promise<WindfinderData> {
  if (!spotname) throw new Error('No spot name specified!')
  if (typeof spotname !== 'string') throw new TypeError('Spot name must be a string')

  const url = UrlBuilder.windfinder(spotname)

  try {
    const res = await fetch(url)
    const html = await res.text()

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

  const url = UrlBuilder.windguru(spot)

  try {
    const res = await fetch(url)
    const txt = await res.text()

    const windguru = new Windguru(txt)
      .extract()
      .parse()
      .get()

    return windguru
  } catch (err) {
    throw err
  }
}

async function windy (lat: string | number, long: string | number): Promise<any> {
  if (!lat || !long) throw new Error('No coordinates specified!')
  if ((typeof lat !== 'string' && typeof lat !== 'number') || (typeof long !== 'string' && typeof long !== 'number')) throw new TypeError('Coordinates must be a string or a number')

  const url = UrlBuilder.windy(lat, long)

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })

    let html = await page.evaluate(() => document.body.innerHTML)
    await browser.close()

    const windy = new Windy(html)
      .extract()
      .parse()
      .get()

    return windy
  } catch (err) {
    await browser.close()

    if (err.name === 'TimeoutError') throw new Error('The request timed out after 30000ms')

    throw err
  }
}

async function windReport (spotname: string): Promise<WindReport | Error> {
  if (!spotname) throw new Error('No spot specified!')
  if (typeof spotname !== 'string') throw new TypeError('Spotname must be a string!')

  const url = UrlBuilder.windReport(spotname)

  let data: ExtractedWindReport = []

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  try {
    page.on('response', async (res) => {
      if (res.url().includes('https://api.windfinder.com/v2/spots') && res.url().includes('reports')) {
        data = await res.json()
      }
    })

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })
    await browser.close()

    if (data.length < 1) throw new Error('The spot doesn\'t exist or doesn\'t have a report')
  
    const report = new Report(spotname, data)
      .parse()
      .get()

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
