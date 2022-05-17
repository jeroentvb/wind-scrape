import fetch from 'node-fetch';

import Windguru from '../partials/data-parsers/windguru-parser';
import { typeCheckWindguru, typeCheckCustomWindguru } from '../partials/utils/type-check';
import { getWindguruUrl, getCustomWindguruUrl } from '../partials/utils/url-builder';

import type { WindguruData } from '../interfaces/windguru';
import type { Coordinates } from '../interfaces/coordinates';
import type { Credentials } from '../interfaces/credentials';

import { WindguruErrors } from '../constants';

export async function windguru(spot: number | string, model?: string | number): Promise<WindguruData> {
   typeCheckWindguru(spot, model);

   const url = getWindguruUrl(spot, model);

   return getWindguru(url);
}

export async function customWindguru(coordinates: Coordinates, credentials: Credentials, model?: string | number): Promise<WindguruData> {
   typeCheckCustomWindguru(coordinates, credentials, model);

   const url = getCustomWindguruUrl(coordinates, credentials);

   return getWindguru(url, true);
}

async function getWindguru(url: string, custom = false): Promise<WindguruData> {
   const res = await fetch(url);
   const txt = await res.text();

   const windguru = new Windguru(txt)
      .extract()
      .parse()
      .get();

   if (!windguru.spot) throw new Error(WindguruErrors.SPOT_DOES_NOT_EXIST);
   if (windguru.models.length < 1 && !custom) throw new Error(WindguruErrors.SELECTED_MODEL_DOES_NOT_EXIST);
   if (windguru.models.length < 1 && custom) throw new Error(WindguruErrors.MODEL_NOT_AVAILABLE);
   if (windguru.models[0].name.includes('Wrong password')) throw new Error(WindguruErrors.PRO_ACCOUNT_REQUIRED);

   return windguru;
}
