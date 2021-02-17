export declare enum WindfinderErrors {
    NO_SPOT_NAME = "no spot name specified",
    INCORRECT_SPOT_TYPE = "spot name must of type string",
    SPOT_DOES_NOT_EXIST = "the provided windfinder spot doesn't exist.."
}
export declare enum WindguruErrors {
    NO_SPOT_NUMBER = "no spot number specified",
    INCORRECT_SPOT_TYPE = "spotnumber must be of type string or number",
    INCORRECT_MODEL_TYPE = "model must be of type string or number",
    SPOT_DOES_NOT_EXIST = "the provided windguru spot doesn't exist..",
    SELECTED_MODEL_DOES_NOT_EXIST = "the provided windguru model isn't available for the provided spot",
    NO_COORDINATES_OR_CREDENTIALS = "no coordinates or credentials specified",
    NO_COORDINATES_SPECIFIED = "no coordinates specified. Please check if the keys are correct",
    COORDINATES_INCORRECT_TYPE = "coordinates.lat and .lon must be of type string or number",
    NO_CREDENTIALS_SPECIFIED = "no credentials specified. Please check if the keys are correct",
    CREDENTIALS_INCORRECT_TYPE = "coordinates.username and .password must be of type string or number",
    MODEL_NOT_AVAILABLE = "the selected model isn't available for the provided coordinates, or the provided coordinates are incorrect"
}
export declare enum WindyErrors {
    NO_COORDINATES = "no coordinates specified",
    INCORRECT_COORDINATES_TYPE = "coordinates must be of type string or number"
}
export declare enum WindReportErrors {
    NO_SPOT = "No spot specified",
    INCORRECT_SPOT_TYPE = "spotname must be of type string",
    NO_SPOT_OR_REPORT = "the spot doesn't exist or doesn't have a report"
}
export declare const REQUEST_TIMEOUT = "The request timed out after 30000ms";
export declare const WIND_REPORT_API_URL = "https://api.windfinder.com/v2/spots";
