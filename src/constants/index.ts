export enum WindfinderErrors {
  NO_SPOT_NAME = 'no spot name specified!',
  INCORRECT_SPOT_TYPE = 'spot name must be a string',
  SPOT_DOES_NOT_EXIST = 'the provided windfinder spot doesn\'t exist..'
}

export enum WindguruErrors {
  NO_SPOT_NUMBER = 'no spot number specified!',
  INCORRECT_SPOT_TYPE = 'spotnumber must be a number or a string!',
  SPOT_DOES_NOT_EXIST = 'the provided windguru spot doesn\'t exist..'
}

export enum WindyErrors {
  NO_COORDINATES = 'no coordinates specified!',
  INCORRECT_COORDINATES_TYPE = 'coordinates must be a string or a number',
}

export enum WindReportErrors {
  NO_SPOT = 'No spot specified!',
  INCORRECT_SPOT_TYPE = 'Spotname must be a string!',
  NO_SPOT_OR_REPORT = 'The spot doesn\'t exist or doesn\'t have a report'
}

export const REQUEST_TIMEOUT = 'The request timed out after 30000ms'

export const WIND_REPORT_API_URL = 'https://api.windfinder.com/v2/spots'