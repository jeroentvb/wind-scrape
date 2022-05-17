import puppeteer from 'puppeteer';

import Report from '../partials/data-parsers/windfinder-report-parser.js';
import { typeCheckWindReport } from '../partials/utils/type-check.js';
import { getWindReportUrl } from '../partials/utils/url-builder.js';

import type { WindReport, ExtractedWindReport } from '../interfaces/wind-report.js';

import { REQUEST_TIMEOUT, WindReportErrors, WIND_REPORT_API_URL, PPTR_TIMEOUT } from '../constants/index.js';

export default async function windReport(spotname: string): Promise<WindReport> {
   typeCheckWindReport(spotname);

   const url = getWindReportUrl(spotname);

   let data: ExtractedWindReport = [];

   const browser = await puppeteer.launch();
   const page = await browser.newPage();

   try {
      page.on('response', async (res) => {
         if (res.url().includes(WIND_REPORT_API_URL) && res.url().includes('reports')) {
            data = await res.json();
         }
      });

      await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
      await browser.close();

      if (data.length < 1) throw new Error(WindReportErrors.NO_SPOT_OR_REPORT);

      const report = new Report(spotname, data)
         .parse()
         .get();

      return report;
   } catch (err: any) { // TODO type correctly
      await browser.close();

      if (err.name === PPTR_TIMEOUT) throw new Error(REQUEST_TIMEOUT);

      throw err;
   }
}
