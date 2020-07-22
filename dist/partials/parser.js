"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __importDefault(require("./utils"));
function windfinder(data) {
    // TODO: refactor this function
    const windfinder = {
        name: 'Windfinder',
        spot: data.spot,
        days: []
    };
    const days = [
        utils_1.default.getWindfinderDay(data, 'one'),
        utils_1.default.getWindfinderDay(data, 'two'),
        utils_1.default.getWindfinderDay(data, 'three')
    ];
    days.forEach((day) => {
        let dayData = {
            date: day.date,
            hours: []
        };
        day.time.forEach((hour, j) => {
            dayData.hours.push({
                hour: day.time[j],
                windspeed: day.windspeed[j],
                windgust: day.windgust[j],
                winddirection: day.winddirection[j],
                temperature: day.temperature[j],
                wavedirection: day.wavedirection[j],
                waveheight: day.waveheight[j],
                waveinterval: day.waveinterval[j]
            });
        });
        windfinder.days.push(dayData);
    });
    return windfinder;
}
function windguru(extractedData) {
    // Group the data by day
    const models = extractedData.models.map(model => {
        const days = [];
        let currentDay = '';
        let count = -1;
        // Group the data by hour
        model.data.forEach(modelData => {
            const parsedDate = utils_1.default.windguru.getDate(modelData.date);
            if (currentDay !== parsedDate) {
                currentDay = parsedDate;
                count++;
                days[count] = {
                    date: parsedDate,
                    hours: []
                };
            }
            modelData.hour = utils_1.default.windguru.getHour(modelData.date);
            delete modelData.date;
            days[count].hours.push(modelData);
        });
        return {
            name: model.name,
            days
        };
    });
    return {
        spot: extractedData.spot,
        models
    };
}
function windy(data) {
    let newData = {
        name: data.name,
        models: []
    };
    data.models.forEach((model, i) => {
        newData.models[i] = {
            name: model.name,
            days: []
        };
        let day;
        let dayCount = 0;
        model.time.forEach((item, j) => {
            let hour = {
                hour: model.time[j],
                windspeed: model.windspeed[j],
                windgust: model.windgust[j],
                winddirection: model.winddirection[j]
            };
            if (j === 0) {
                newData.models[i].days[0] = {
                    date: data.date[0] ? utils_1.default.reverseDate(data.date[0]) : null,
                    hours: []
                };
                newData.models[i].days[0].hours.push(hour);
            }
            else if (item < day) {
                dayCount++;
                newData.models[i].days[dayCount] = {
                    date: data.date[dayCount] ? utils_1.default.reverseDate(data.date[dayCount]) : null,
                    hours: []
                };
                newData.models[i].days[dayCount].hours.push(hour);
            }
            else {
                newData.models[i].days[dayCount].hours.push(hour);
            }
            day = item;
        });
    });
    return newData;
}
function windReport(data) {
    data.report = data.report.map(x => {
        if (x.wg) {
            return {
                windspeed: x.ws,
                windgust: x.wg,
                winddirection: x.wd,
                time: x.dtl
            };
        }
        else {
            return {
                windspeed: x.ws,
                winddirection: x.wd,
                time: x.dtl
            };
        }
    });
    return data;
}
exports.default = {
    windfinder,
    windguru,
    windy,
    windReport
};
