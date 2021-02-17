import windfinder from './partials/windfinder'
import { windguru, customWindguru } from './partials/windguru'
import windy from './partials/windy'
import windReport from './partials/windfinder-report'

import { WindfinderData } from './interfaces/windfinder'
import { WindguruData } from './interfaces/windguru'
import { WindyData } from './interfaces/windy'
import { WindReport } from './interfaces/wind-report'

export {
  windfinder,
  windguru,
  customWindguru,
  windy,
  windReport,

  // Expose types
  WindfinderData,
  WindguruData,
  WindyData,
  WindReport
}
