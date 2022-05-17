import windfinder from './partials/windfinder.js';
import { windguru, customWindguru } from './partials/windguru.js';
import windy from './partials/windy.js';
import windReport from './partials/windfinder-report.js';

import type { WindfinderData } from './interfaces/windfinder.js';
import type { WindguruData } from './interfaces/windguru.js';
import type { WindyModel } from './interfaces/windy.js';
import type { WindReport } from './interfaces/wind-report.js';

export {
   windfinder,
   windguru,
   customWindguru,
   windy,
   windReport,

   // Expose types
   WindfinderData,
   WindguruData,
   WindyModel,
   WindReport
};
