import { WindfinderErrors, WindguruErrors, WindReportErrors, WindyErrors } from '../../constants/index.js';

export function typeCheckWindfinder(spotname: unknown) {
   if (!spotname) {
      throw new Error(WindfinderErrors.NO_SPOT_NAME);
   }

   if (typeof spotname !== 'string') {
      throw new TypeError(WindfinderErrors.INCORRECT_SPOT_TYPE);
   }
}

export function typeCheckWindguru(spot: unknown, model?: unknown) {
   if (!spot) {
      throw new Error(WindguruErrors.NO_SPOT_NUMBER);
   }

   if (typeof spot !== 'number' && typeof spot !== 'string') {
      throw new TypeError(WindguruErrors.INCORRECT_SPOT_TYPE);
   }

   if (model && (typeof model !== 'string' && typeof model !== 'number')) {
      throw new TypeError(WindguruErrors.INCORRECT_MODEL_TYPE);
   }
}

export function typeCheckCustomWindguru(coordinates: any, credentials: any, model?: unknown) {
   if (!coordinates || !credentials) {
      throw new TypeError(WindguruErrors.NO_COORDINATES_OR_CREDENTIALS);
   }

   if (!coordinates.lat || !coordinates.lon) {
      throw new TypeError(WindguruErrors.NO_COORDINATES_SPECIFIED);
   }

   if (
      (typeof coordinates.lat !== 'string' && typeof coordinates.lat !== 'number') ||
   (typeof coordinates.lon !== 'string' && typeof coordinates.lon !== 'number')
   ) {
      throw new TypeError(WindguruErrors.COORDINATES_INCORRECT_TYPE);
   }

   if (!credentials.username || !credentials.password) {
      throw new TypeError(WindguruErrors.NO_CREDENTIALS_SPECIFIED);
   }

   if (
      typeof credentials.username !== 'string' ||
   typeof credentials.password !== 'string'
   ) {
      throw new TypeError(WindguruErrors.CREDENTIALS_INCORRECT_TYPE);
   }

   if (model && (typeof model !== 'string'&& typeof model !== 'number')) {
      throw new TypeError(WindguruErrors.INCORRECT_MODEL_TYPE);
   }
}

export function typeCheckWindy(lat: unknown, lon: unknown) {
   if (!lat || !lon) {
      throw new Error(WindyErrors.NO_COORDINATES);
   }

   if (
      (typeof lat !== 'string' && typeof lat !== 'number') ||
   (typeof lon !== 'string' && typeof lon !== 'number')
   ) {
      throw new TypeError(WindyErrors.INCORRECT_COORDINATES_TYPE);
   }
}

export function typeCheckWindReport(spotname: unknown) {
   if (!spotname) {
      throw new Error(WindReportErrors.NO_SPOT);
   }

   if (typeof spotname !== 'string') {
      throw new TypeError(WindReportErrors.INCORRECT_SPOT_TYPE);
   }
}
