"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Report {
    constructor(spot, data) {
        this.spot = spot;
        this.data = data;
    }
    parse() {
        const report = this.data.map(datapoint => ({
            windspeed: datapoint.ws,
            winddirection: datapoint.wd,
            time: datapoint.dtl,
            ...(datapoint.wg && { windgust: datapoint.wg }),
            ...(datapoint.at && { temperature: datapoint.at }),
            ...(datapoint.ap && { airPressure: datapoint.ap })
        }));
        this.parsedData = {
            name: 'Windfinder report',
            spot: this.spot,
            report
        };
        return this;
    }
    get() {
        return this.parsedData;
    }
}
exports.default = Report;
