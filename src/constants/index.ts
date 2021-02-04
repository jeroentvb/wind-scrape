export enum WindfinderErrors {
  NO_SPOT_NAME = 'no spot name specified!',
  INCORRECT_SPOT_TYPE = 'spot name must of type string',
  SPOT_DOES_NOT_EXIST = 'the provided windfinder spot doesn\'t exist..'
}

export enum WindguruErrors {
  NO_SPOT_NUMBER = 'no spot number specified!',
  INCORRECT_SPOT_TYPE = 'spotnumber must be of type string or number',
  INCORRECT_MODEL_TYPE = 'model must be of type string or number',
  SPOT_DOES_NOT_EXIST = 'the provided windguru spot doesn\'t exist..',
  SELECTED_MODEL_DOES_NOT_EXIST = 'the provided windguru model isn\'t available for the provided spot'
}

export enum WindyErrors {
  NO_COORDINATES = 'no coordinates specified!',
  INCORRECT_COORDINATES_TYPE = 'coordinates must be of type string or number',
}

export enum WindReportErrors {
  NO_SPOT = 'No spot specified!',
  INCORRECT_SPOT_TYPE = 'spotname must be of type string',
  NO_SPOT_OR_REPORT = 'the spot doesn\'t exist or doesn\'t have a report'
}

export const REQUEST_TIMEOUT = 'The request timed out after 30000ms'

export const WIND_REPORT_API_URL = 'https://api.windfinder.com/v2/spots'