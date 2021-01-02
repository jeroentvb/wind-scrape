"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.windReport = exports.windy = exports.windguru = exports.windfinder = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const windfinder_1 = __importDefault(require("./partials/windfinder"));
const windguru_1 = __importDefault(require("./partials/windguru"));
const url_builder_1 = __importDefault(require("./partials/url-builder"));
const windy_1 = __importDefault(require("./partials/windy"));
const windfinder_report_1 = __importDefault(require("./partials/windfinder-report"));
const constants_1 = require("./constants");
async function windfinder(spotname) {
    if (!spotname)
        throw new Error(constants_1.WindfinderErrors.NO_SPOT_NAME);
    if (typeof spotname !== 'string')
        throw new TypeError(constants_1.WindfinderErrors.INCORRECT_SPOT_TYPE);
    const url = url_builder_1.default.windfinder(spotname);
    try {
        const res = await node_fetch_1.default(url);
        const html = await res.text();
        const windfinder = new windfinder_1.default(html)
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
exports.windfinder = windfinder;
async function windguru(spot) {
    if (!spot)
        throw new Error(constants_1.WindguruErrors.NO_SPOT_NUMBER);
    if (typeof spot !== 'number' && typeof spot !== 'string')
        throw new TypeError(constants_1.WindguruErrors.INCORRECT_SPOT_TYPE);
    const url = url_builder_1.default.windguru(spot);
    try {
        const res = await node_fetch_1.default(url);
        const txt = await res.text();
        const windguru = new windguru_1.default(txt)
            .extract()
            .parse()
            .get();
        if (!windguru.spot)
            throw new Error(constants_1.WindfinderErrors.SPOT_DOES_NOT_EXIST);
        return windguru;
    }
    catch (err) {
        throw err;
    }
}
exports.windguru = windguru;
async function windy(lat, long) {
    if (!lat || !long)
        throw new Error(constants_1.WindyErrors.NO_COORDINATES);
    if ((typeof lat !== 'string' && typeof lat !== 'number') || (typeof long !== 'string' && typeof long !== 'number'))
        throw new TypeError(constants_1.WindyErrors.INCORRECT_COORDINATES_TYPE);
    const url = url_builder_1.default.windy(lat, long);
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
        const html = await page.evaluate(() => document.body.innerHTML);
        await browser.close();
        const windy = new windy_1.default(html)
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
exports.windy = windy;
async function windReport(spotname) {
    if (!spotname)
        throw new Error(constants_1.WindReportErrors.NO_SPOT);
    if (typeof spotname !== 'string')
        throw new TypeError(constants_1.WindReportErrors.INCORRECT_SPOT_TYPE);
    const url = url_builder_1.default.windReport(spotname);
    let data = [];
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    try {
        page.on('response', async (res) => {
            if (res.url().includes(constants_1.WIND_REPORT_API_URL) && res.url().includes('reports')) {
                data = await res.json();
            }
        });
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
        await browser.close();
        if (data.length < 1)
            throw new Error(constants_1.WindReportErrors.NO_SPOT_OR_REPORT);
        const report = new windfinder_report_1.default(spotname, data)
            .parse()
            .get();
        return report;
    }
    catch (err) {
        await browser.close();
        if (err.name === 'TimeoutError')
            throw new Error(constants_1.REQUEST_TIMEOUT);
        throw err;
    }
}
exports.windReport = windReport;
