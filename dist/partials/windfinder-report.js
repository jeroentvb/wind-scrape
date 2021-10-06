"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const windfinder_report_parser_1 = __importDefault(require("../partials/data-parsers/windfinder-report-parser"));
const type_check_1 = __importDefault(require("../partials/utils/type-check"));
const url_builder_1 = __importDefault(require("../partials/utils/url-builder"));
const constants_1 = require("../constants");
async function windReport(spotname) {
    type_check_1.default.windReport(spotname);
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
        const report = new windfinder_report_parser_1.default(spotname, data)
            .parse()
            .get();
        return report;
    }
    catch (err) { // TODO type correctly
        await browser.close();
        if (err.name === constants_1.PPTR_TIMEOUT)
            throw new Error(constants_1.REQUEST_TIMEOUT);
        throw err;
    }
}
exports.default = windReport;
