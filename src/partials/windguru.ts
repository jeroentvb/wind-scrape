import fetch from 'node-fetch';

import Windguru from '../partials/data-parsers/windguru-parser';
import TypeCheck from '../partials/utils/type-check';
import UrlBuilder from '../partials/utils/url-builder';

import { WindguruData } from '../interfaces/windguru';
import { Coordinates } from '../interfaces/coordinates';
import { Credentials } from '../interfaces/credentials';

import { WindguruErrors } from '../constants';

async function windguru(spot: number | string, model?: string | number): Promise<WindguruData> {
   TypeCheck.windguru(spot, model);

   const url = UrlBuilder.windguru(spot, model);

   return getWindguru(url);
}

async function customWindguru(coordinates: Coordinates, credentials: Credentials, model?: string | number): Promise<WindguruData> {
   TypeCheck.customWindguru(coordinates, credentials, model);

   const url = UrlBuilder.customWindguru(coordinates, credentials);

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

export {
   windguru,
   customWindguru
};
