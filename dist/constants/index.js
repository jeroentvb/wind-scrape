"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WIND_REPORT_API_URL = exports.REQUEST_TIMEOUT = exports.WindReportErrors = exports.WindyErrors = exports.WindguruErrors = exports.WindfinderErrors = void 0;
var WindfinderErrors;
(function (WindfinderErrors) {
    WindfinderErrors["NO_SPOT_NAME"] = "no spot name specified!";
    WindfinderErrors["INCORRECT_SPOT_TYPE"] = "spot name must be a string";
    WindfinderErrors["SPOT_DOES_NOT_EXIST"] = "the provided windfinder spot doesn't exist..";
})(WindfinderErrors = exports.WindfinderErrors || (exports.WindfinderErrors = {}));
var WindguruErrors;
(function (WindguruErrors) {
    WindguruErrors["NO_SPOT_NUMBER"] = "no spot number specified!";
    WindguruErrors["INCORRECT_SPOT_TYPE"] = "spotnumber must be a number or a string!";
    WindguruErrors["SPOT_DOES_NOT_EXIST"] = "the provided windguru spot doesn't exist..";
})(WindguruErrors = exports.WindguruErrors || (exports.WindguruErrors = {}));
var WindyErrors;
(function (WindyErrors) {
    WindyErrors["NO_COORDINATES"] = "no coordinates specified!";
    WindyErrors["INCORRECT_COORDINATES_TYPE"] = "coordinates must be a string or a number";
})(WindyErrors = exports.WindyErrors || (exports.WindyErrors = {}));
var WindReportErrors;
(function (WindReportErrors) {
    WindReportErrors["NO_SPOT"] = "No spot specified!";
    WindReportErrors["INCORRECT_SPOT_TYPE"] = "Spotname must be a string!";
    WindReportErrors["NO_SPOT_OR_REPORT"] = "The spot doesn't exist or doesn't have a report";
})(WindReportErrors = exports.WindReportErrors || (exports.WindReportErrors = {}));
exports.REQUEST_TIMEOUT = 'The request timed out after 30000ms';
exports.WIND_REPORT_API_URL = 'https://api.windfinder.com/v2/spots';
