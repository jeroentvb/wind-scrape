"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const extract_data_1 = __importDefault(require("./partials/extract-data"));
const parser_1 = __importDefault(require("./partials/parser"));
const utils_1 = __importDefault(require("./partials/utils"));
async function windfinder(spotname) {
    if (!spotname)
        throw new Error('No spot name specified!');
    if (typeof spotname !== 'string')
        throw new TypeError('Spot name must be a string');
    const url = `https://www.windfinder.com/weatherforecast/${spotname}`;
    try {
        const res = await node_fetch_1.default(url);
        const html = await res.text();
        const data = extract_data_1.default.windfinderData(html);
        const windfinder = parser_1.default.windfinder(data);
        if (windfinder.spot === '')
            throw new Error('The provided windfinder spot doesn\'t exist..');
        return windfinder;
    }
    catch (err) {
        return err;
    }
}
exports.windfinder = windfinder;
async function windguru(spot) {
    if (!spot)
        throw new Error('No spot number specified!');
    if (typeof spot !== 'number' && typeof spot !== 'string')
        throw new TypeError('Spotnumber must be a number or a string!');
    const url = utils_1.default.createRequestUrl(spot);
    try {
        const res = await node_fetch_1.default(url);
        const html = await res.text();
        const extractedData = extract_data_1.default.windguruData(html);
        const data = parser_1.default.windguru(extractedData);
        return data;
    }
    catch (err) {
        return err;
    }
}
exports.windguru = windguru;
async function windy(lat, long) {
    if (!lat || !long)
        throw new Error('No coordinates specified!');
    if ((typeof lat !== 'string' && typeof lat !== 'number') || (typeof long !== 'string' && typeof long !== 'number'))
        throw new TypeError('Coordinates must be a string or a number');
    const url = `https://www.windy.com/${lat}/${long}/wind?`;
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
        let html = await page.evaluate(() => document.body.innerHTML);
        await browser.close();
        const rawData = extract_data_1.default.windyData(html);
        let data = parser_1.default.windy(rawData);
        data.url = url;
        return data;
    }
    catch (err) {
        await browser.close();
        if (err.name === 'TimeoutError')
            return new Error('The request timed out after 30000ms');
        return err;
    }
}
exports.windy = windy;
async function windReport(spotname) {
    if (!spotname)
        throw new Error('No spot specified!');
    if (typeof spotname !== 'string')
        throw new TypeError('Spotname must be a string!');
    const url = `https://www.windfinder.com/report/${spotname}`;
    let data = {
        name: 'Windfinder report',
        spot: spotname,
        report: []
    };
    const browser = await puppeteer_1.default.launch();
    const page = await browser.newPage();
    try {
        page.on('response', async (res) => {
            if (res.url().includes('https://api.windfinder.com/v2/spots') && res.url().includes('reports')) {
                data.report = await res.json();
            }
        });
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
        await browser.close();
        if (data.report.length < 1)
            return new Error('The spot doesn\'t exist or doesn\'t have a report');
        const report = parser_1.default.windReport(data);
        return report;
    }
    catch (err) {
        await browser.close();
        if (err.name === 'TimeoutError')
            return new Error('The request timed out after 30000ms');
        return err;
    }
}
exports.windReport = windReport;
