"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customWindguru = exports.windguru = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const windguru_parser_1 = __importDefault(require("../partials/data-parsers/windguru-parser"));
const type_check_1 = __importDefault(require("../partials/utils/type-check"));
const url_builder_1 = __importDefault(require("../partials/utils/url-builder"));
const constants_1 = require("../constants");
async function windguru(spot, model) {
    try {
        type_check_1.default.windguru(spot, model);
        const url = url_builder_1.default.windguru(spot, model);
        return getWindguru(url);
    }
    catch (err) {
        throw err;
    }
}
exports.windguru = windguru;
async function customWindguru(coordinates, credentials, model) {
    try {
        type_check_1.default.customWindguru(coordinates, credentials, model);
        const url = url_builder_1.default.customWindguru(coordinates, credentials);
        return getWindguru(url, true);
    }
    catch (err) {
        throw err;
    }
}
exports.customWindguru = customWindguru;
async function getWindguru(url, custom = false) {
    try {
        const res = await node_fetch_1.default(url);
        const txt = await res.text();
        const windguru = new windguru_parser_1.default(txt)
            .extract()
            .parse()
            .get();
        if (!windguru.spot)
            throw new Error(constants_1.WindguruErrors.SPOT_DOES_NOT_EXIST);
        if (windguru.models.length < 1 && !custom)
            throw new Error(constants_1.WindguruErrors.SELECTED_MODEL_DOES_NOT_EXIST);
        if (windguru.models.length < 1 && custom)
            throw new Error(constants_1.WindguruErrors.MODEL_NOT_AVAILABLE);
        if (windguru.models[0].name.includes('Wrong password'))
            throw new Error(constants_1.WindguruErrors.PRO_ACCOUNT_REQUIRED);
        return windguru;
    }
    catch (err) {
        throw err;
    }
}
