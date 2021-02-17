"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const windy_parser_1 = __importDefault(require("../partials/data-parsers/windy-parser"));
const type_check_1 = __importDefault(require("../partials/utils/type-check"));
const url_builder_1 = __importDefault(require("../partials/utils/url-builder"));
const constants_1 = require("../constants");
async function windy(lat, long) {
    type_check_1.default.windy(lat, long);
    const url = url_builder_1.default.windy(lat, long);
    const browser = await puppeteer_1.default.launch();
    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
        const html = await page.evaluate(() => document.body.innerHTML);
        await browser.close();
        const windy = new windy_parser_1.default(html)
            .extract()
            .parse()
            .get();
        return windy;
    }
    catch (err) {
        await browser.close();
        if (err.name === 'TimeoutError')
            throw new Error(constants_1.REQUEST_TIMEOUT);
        throw err;
    }
}
exports.default = windy;
