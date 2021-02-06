import fetch from 'node-fetch'

import Windguru from '../partials/data-parsers/windguru-parser'
import TypeCheck from '../partials/utils/type-check'
import UrlBuilder from '../partials/utils/url-builder'

import { WindguruData } from '../interfaces/windguru'

import { WindguruErrors } from '../constants'

export default async function windguru (spot: number | string, model?: string | number): Promise<WindguruData> {
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
