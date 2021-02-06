import { WindfinderErrors, WindguruErrors, WindReportErrors, WindyErrors } from '../../constants'

export default class TypeCheck {

  static windfinder (spotname: any) {
    if (!spotname) {
      throw new Error(WindfinderErrors.NO_SPOT_NAME)
    }

    if (typeof spotname !== 'string') {
      throw new TypeError(WindfinderErrors.INCORRECT_SPOT_TYPE)
    }
  }

  static windguru  (spot: any, model?: any) {
    if (!spot) {
      throw new Error(WindguruErrors.NO_SPOT_NUMBER)
    }

    if (typeof spot !== 'number' && typeof spot !== 'string') {
      throw new TypeError(WindguruErrors.INCORRECT_SPOT_TYPE)
    }

    if (model && (typeof model !== 'string'&& typeof model !== 'number')) {
      throw new TypeError(WindguruErrors.INCORRECT_MODEL_TYPE)
    }
  }

  static windy (lat: any, lon: any) {
    if (!lat || !lon) {
      throw new Error(WindyErrors.NO_COORDINATES)
    }

    if (
      (typeof lat !== 'string' && typeof lat !== 'number') ||
      (typeof lon !== 'string' && typeof lon !== 'number')
      ) {
      throw new TypeError(WindyErrors.INCORRECT_COORDINATES_TYPE)
    }
  }

  static windReport (spotname: any) {
    if (!spotname) {
      throw new Error(WindReportErrors.NO_SPOT)
    }

    if (typeof spotname !== 'string') {
      throw new TypeError(WindReportErrors.INCORRECT_SPOT_TYPE)
    }
  }

}
