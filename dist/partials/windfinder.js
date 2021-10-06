"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const windfinder_parser_1 = __importDefault(require("../partials/data-parsers/windfinder-parser"));
const type_check_1 = __importDefault(require("../partials/utils/type-check"));
const url_builder_1 = __importDefault(require("../partials/utils/url-builder"));
const constants_1 = require("../constants");
async function windfinder(spotname) {
    try {
        type_check_1.default.windfinder(spotname);
        const url = url_builder_1.default.windfinder(spotname);
        const res = await (0, node_fetch_1.default)(url);
        const html = await res.text();
        const windfinder = new windfinder_parser_1.default(html)
            .extract()
            .parse()
            .get();
        if (!windfinder.spot)
            throw new Error(constants_1.WindfinderErrors.SPOT_DOES_NOT_EXIST);
        return windfinder;
    }
    catch (err) {
        throw err;
    }
}
exports.default = windfinder;
