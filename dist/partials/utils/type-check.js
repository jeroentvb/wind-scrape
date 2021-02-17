"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
class TypeCheck {
    static windfinder(spotname) {
        if (!spotname) {
            throw new Error(constants_1.WindfinderErrors.NO_SPOT_NAME);
        }
        if (typeof spotname !== 'string') {
            throw new TypeError(constants_1.WindfinderErrors.INCORRECT_SPOT_TYPE);
        }
    }
    static windguru(spot, model) {
        if (!spot) {
            throw new Error(constants_1.WindguruErrors.NO_SPOT_NUMBER);
        }
        if (typeof spot !== 'number' && typeof spot !== 'string') {
            throw new TypeError(constants_1.WindguruErrors.INCORRECT_SPOT_TYPE);
        }
        if (model && (typeof model !== 'string' && typeof model !== 'number')) {
            throw new TypeError(constants_1.WindguruErrors.INCORRECT_MODEL_TYPE);
        }
    }
    static customWindguru(coordinates, credentials, model) {
        if (!coordinates || !credentials) {
            throw new TypeError(constants_1.WindguruErrors.NO_COORDINATES_OR_CREDENTIALS);
        }
        if (!coordinates.lat || !coordinates.lon) {
            throw new TypeError(constants_1.WindguruErrors.NO_COORDINATES_SPECIFIED);
        }
        if ((typeof coordinates.lat !== 'string' && typeof coordinates.lat !== 'number') ||
            (typeof coordinates.lon !== 'string' && typeof coordinates.lon !== 'number')) {
            throw new TypeError(constants_1.WindguruErrors.COORDINATES_INCORRECT_TYPE);
        }
        if (!credentials.username || !credentials.password) {
            throw new TypeError(constants_1.WindguruErrors.NO_CREDENTIALS_SPECIFIED);
        }
        if (typeof credentials.username !== 'string' ||
            typeof credentials.password !== 'string') {
            throw new TypeError(constants_1.WindguruErrors.CREDENTIALS_INCORRECT_TYPE);
        }
        if (model && (typeof model !== 'string' && typeof model !== 'number')) {
            throw new TypeError(constants_1.WindguruErrors.INCORRECT_MODEL_TYPE);
        }
    }
    static windy(lat, lon) {
        if (!lat || !lon) {
            throw new Error(constants_1.WindyErrors.NO_COORDINATES);
        }
        if ((typeof lat !== 'string' && typeof lat !== 'number') ||
            (typeof lon !== 'string' && typeof lon !== 'number')) {
            throw new TypeError(constants_1.WindyErrors.INCORRECT_COORDINATES_TYPE);
        }
    }
    static windReport(spotname) {
        if (!spotname) {
            throw new Error(constants_1.WindReportErrors.NO_SPOT);
        }
        if (typeof spotname !== 'string') {
            throw new TypeError(constants_1.WindReportErrors.INCORRECT_SPOT_TYPE);
        }
    }
}
exports.default = TypeCheck;
