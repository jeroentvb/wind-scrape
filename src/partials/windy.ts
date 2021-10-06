import puppeteer from 'puppeteer'

import Windy from '../partials/data-parsers/windy-parser'
import TypeCheck from '../partials/utils/type-check'
import UrlBuilder from '../partials/utils/url-builder'

import { WindyData } from '../interfaces/windy'

import { PPTR_TIMEOUT, REQUEST_TIMEOUT } from '../constants'

export default async function windy (lat: string | number, long: string | number): Promise<WindyData> {
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
  } catch (err: any) { // TODO type correctly
    await browser.close()

    if (err.name === PPTR_TIMEOUT) throw new Error(REQUEST_TIMEOUT)

    throw err
  }
}
