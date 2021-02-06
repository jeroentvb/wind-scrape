import puppeteer from 'puppeteer'
import fetch from 'node-fetch'

import Windfinder from './partials/windfinder'
import Windguru from './partials/windguru'
import Windy from './partials/windy'
import Report from './partials/windfinder-report'
import UrlBuilder from './partials/url-builder'
import TypeCheck from './partials/type-check'

import { WindfinderData } from './interfaces/windfinder'
import { WindguruData } from './interfaces/windguru'
import { WindyData } from './interfaces/windy'
import { WindReport, ExtractedWindReport } from './interfaces/wind-report'

import { REQUEST_TIMEOUT, WindfinderErrors, WindguruErrors, WindReportErrors, WIND_REPORT_API_URL } from './constants'

async function windfinder (spotname: string): Promise<WindfinderData> {
  try {
    TypeCheck.windfinder(spotname)

    const url = UrlBuilder.windfinder(spotname)
    const res = await fetch(url)
    const html = await res.text()

    const windfinder = new Windfinder(html)
      .extract()
      .parse()
      .get()

    if (!windfinder.spot) throw new Error(WindfinderErrors.SPOT_DOES_NOT_EXIST)
    
    return windfinder
  } catch (err) {
    throw err
  }
}

async function windguru (spot: number | string, model?: string | number): Promise<WindguruData> {
  try {
    TypeCheck.windguru(spot, model)

    const url = UrlBuilder.windguru(spot, model)
    const res = await fetch(url)
    const txt = await res.text()

    console.log(txt)

    const windguru = new Windguru(txt)
      .extract()
      .parse()
      .get()

    if (!windguru.spot) throw new Error(WindguruErrors.SPOT_DOES_NOT_EXIST)
    if (windguru.models.length < 1) throw new Error(WindguruErrors.SELECTED_MODEL_DOES_NOT_EXIST)

    return windguru
  } catch (err) {
    throw err
  }
}

async function windy (lat: string | number, long: string | number): Promise<WindyData> {
  TypeCheck.windy(lat, long)

  const url = UrlBuilder.windy(lat, long)
  const browser = await puppeteer.launch()

  try {
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })

    const html = await page.evaluate(() => document.body.innerHTML)
    await browser.close()

    const windy = new Windy(html)
      .extract()
      .parse()
      .get()

    return windy
  } catch (err) {
    await browser.close()

    if (err.name === 'TimeoutError') throw new Error(REQUEST_TIMEOUT)

    throw err
  }
}

async function windReport (spotname: string): Promise<WindReport> {
  TypeCheck.windReport(spotname)
  
  const url = UrlBuilder.windReport(spotname)

  let data: ExtractedWindReport = []

  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  try {
    page.on('response', async (res) => {
      if (res.url().includes(WIND_REPORT_API_URL) && res.url().includes('reports')) {
        data = await res.json()
      }
    })

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 })
    await browser.close()

    if (data.length < 1) throw new Error(WindReportErrors.NO_SPOT_OR_REPORT)

    const report = new Report(spotname, data)
      .parse()
      .get()

    return report
  } catch (err) {
    await browser.close()

    if (err.name === 'TimeoutError') throw new Error(REQUEST_TIMEOUT)

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
