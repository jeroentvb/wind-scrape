"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const windguru_utils_1 = __importDefault(require("../utils/windguru-utils"));
class Windguru extends windguru_utils_1.default {
    constructor(data) {
        super();
        this.data = data;
    }
    extract() {
        let foundPreTag = false;
        let spot = {
            name: '',
            coordinates: {
                lat: '',
                lng: ''
            },
            altitude: '',
            temperature: ''
        };
        const filteredData = this.data
            .split('\n')
            // Get the data from the HTML
            .filter(row => {
            if (row.includes('</pre>'))
                foundPreTag = false;
            if (foundPreTag && row !== '')
                return true;
            if (row.includes('<pre>'))
                foundPreTag = true;
        })
            // Filter unneeded rows from the data, including the spot info
            .filter((row, i) => {
            if (i === 1)
                spot = this.parseSpotInfo(row);
            if (i < 2)
                return false;
            return true;
        });
        // Group the modeldata in its own object
        const rawData = this.extractModel(filteredData);
        const models = rawData.map((modelData) => {
            let modelInfo = '';
            let legend = [];
            // Filter the modelInfo and legend from the data
            const extractedModelData = modelData.filter((row, i) => {
                if (i === 0)
                    modelInfo = this.parseModelInfo(row);
                if (i === 1)
                    legend = this.parseLegend(row);
                if (i < 3)
                    return;
                return true;
            })
                // Split the rows into an array of data
                .map(row => {
                return row
                    .trim()
                    .split(/  +/g);
            })
                // Transform the array of values into an object
                .map(values => {
                const dataObj = {};
                legend.forEach((item, i) => {
                    dataObj[item] = values[i];
                });
                return dataObj;
            });
            return {
                name: modelInfo,
                data: extractedModelData
            };
        });
        this.extractedData = {
            spot,
            models
        };
        return this;
    }
    parse() {
        // Group the data by day
        const models = this.extractedData.models.map(model => {
            const days = [];
            let currentDay = '';
            let count = -1;
            // Group the data by hour
            model.data.forEach(modelData => {
                const parsedDate = this.getDate(modelData.date);
                if (currentDay !== parsedDate) {
                    currentDay = parsedDate;
                    count++;
                    days[count] = {
                        date: parsedDate,
                        hours: []
                    };
                }
                modelData.hour = this.getHour(modelData.date);
                delete modelData.date;
                days[count].hours.push(modelData);
            });
            return {
                name: model.name,
                days
            };
        });
        this.parsedData = {
            spot: this.extractedData.spot,
            models
        };
        return this;
    }
    get() {
        return this.parsedData;
    }
    extractModel(data) {
        const extractedData = [];
        let index = -1;
        data.forEach(row => {
            if (row[0] !== ' ') {
                index++;
                extractedData[index] = [];
            }
            extractedData[index].push(row);
        });
        return extractedData;
    }
}
exports.default = Windguru;
