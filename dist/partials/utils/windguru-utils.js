"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WindguruUtils {
    parseSpotInfo(str) {
        const spotDataString = str
            .split(',')
            .map(item => item.trim())
            .filter((item) => item.includes(':'))
            .map(item => item.trim())
            .map(item => item.split(':').map(item2 => '"' + item2.trim() + '"').join(':'))
            .join(',');
        const spotData = JSON.parse('{' + spotDataString + '}');
        const spotName = str.split(',')[0].trim();
        return {
            name: spotName.includes(':') ? undefined : spotName,
            coordinates: {
                lat: spotData.lat,
                lng: spotData.lon
            },
            altitude: spotData.alt,
            temperature: spotData.SST
        };
    }
    parseModelInfo(str) {
        return str.split('(')[0].trim();
    }
    parseLegend(str) {
        return str.split(' ').filter(item => item).map(item => item.toLocaleLowerCase());
    }
    getDate(str) {
        return str.split(' ').splice(0, 2).join(' ').replace('.', '');
    }
    getHour(str) {
        return str.split(' ')[2].replace('h', '');
    }
}
exports.default = WindguruUtils;
