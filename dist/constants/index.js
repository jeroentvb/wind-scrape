"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PPTR_TIMEOUT = exports.WIND_REPORT_API_URL = exports.REQUEST_TIMEOUT = exports.WindReportErrors = exports.WindyErrors = exports.WindguruErrors = exports.WindfinderErrors = void 0;
var WindfinderErrors;
(function (WindfinderErrors) {
    WindfinderErrors["NO_SPOT_NAME"] = "no spot name specified";
    WindfinderErrors["INCORRECT_SPOT_TYPE"] = "spot name must of type string";
    WindfinderErrors["SPOT_DOES_NOT_EXIST"] = "the provided windfinder spot doesn't exist..";
})(WindfinderErrors = exports.WindfinderErrors || (exports.WindfinderErrors = {}));
var WindguruErrors;
(function (WindguruErrors) {
    WindguruErrors["NO_SPOT_NUMBER"] = "no spot number specified";
    WindguruErrors["INCORRECT_SPOT_TYPE"] = "spotnumber must be of type string or number";
    WindguruErrors["INCORRECT_MODEL_TYPE"] = "model must be of type string or number";
    WindguruErrors["SPOT_DOES_NOT_EXIST"] = "the provided windguru spot doesn't exist..";
    WindguruErrors["SELECTED_MODEL_DOES_NOT_EXIST"] = "the provided windguru model isn't available for the provided spot";
    WindguruErrors["NO_COORDINATES_OR_CREDENTIALS"] = "no coordinates or credentials specified";
    WindguruErrors["NO_COORDINATES_SPECIFIED"] = "no coordinates specified. Please check if the keys are correct";
    WindguruErrors["COORDINATES_INCORRECT_TYPE"] = "coordinates.lat and .lon must be of type string or number";
    WindguruErrors["NO_CREDENTIALS_SPECIFIED"] = "no credentials specified. Please check if the keys are correct";
    WindguruErrors["CREDENTIALS_INCORRECT_TYPE"] = "coordinates.username and .password must be of type string or number";
    WindguruErrors["MODEL_NOT_AVAILABLE"] = "the selected model isn't available for the provided coordinates, or the provided coordinates are incorrect";
    WindguruErrors["PRO_ACCOUNT_REQUIRED"] = "getting a custom windguru spot requires a windguru PRO account";
})(WindguruErrors = exports.WindguruErrors || (exports.WindguruErrors = {}));
var WindyErrors;
(function (WindyErrors) {
    WindyErrors["NO_COORDINATES"] = "no coordinates specified";
    WindyErrors["INCORRECT_COORDINATES_TYPE"] = "coordinates must be of type string or number";
})(WindyErrors = exports.WindyErrors || (exports.WindyErrors = {}));
var WindReportErrors;
(function (WindReportErrors) {
    WindReportErrors["NO_SPOT"] = "No spot specified";
    WindReportErrors["INCORRECT_SPOT_TYPE"] = "spotname must be of type string";
    WindReportErrors["NO_SPOT_OR_REPORT"] = "the spot doesn't exist or doesn't have a report";
})(WindReportErrors = exports.WindReportErrors || (exports.WindReportErrors = {}));
exports.REQUEST_TIMEOUT = 'The request timed out after 30000ms';
exports.WIND_REPORT_API_URL = 'https://api.windfinder.com/v2/spots';
exports.PPTR_TIMEOUT = 'TimeoutError';
