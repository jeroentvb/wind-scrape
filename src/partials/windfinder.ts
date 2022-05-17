import fetch from 'node-fetch';

import Windfinder from '../partials/data-parsers/windfinder-parser.js';
import { typeCheckWindfinder } from '../partials/utils/type-check.js';
import { getWindfinderUrl } from '../partials/utils/url-builder.js';

import type { WindfinderData } from '../interfaces/windfinder.js';

import { WindfinderErrors } from '../constants/index.js';

export default async function windfinder(spotname: string): Promise<WindfinderData> {
   typeCheckWindfinder(spotname);

   const url = getWindfinderUrl(spotname);
   const res = await fetch(url);
   const html = await res.text();

   const windfinder = new Windfinder(html)
      .extract()
      .parse()
      .get();

   if (!windfinder.spot) throw new Error(WindfinderErrors.SPOT_DOES_NOT_EXIST);

   return windfinder;
}
