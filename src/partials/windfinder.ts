import fetch from 'node-fetch'

import Windfinder from '../partials/data-parsers/windfinder-parser'
import TypeCheck from '../partials/utils/type-check'
import UrlBuilder from '../partials/utils/url-builder'

import { WindfinderData } from '../interfaces/windfinder'

import { WindfinderErrors } from '../constants'

export default async function windfinder (spotname: string): Promise<WindfinderData> {
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
