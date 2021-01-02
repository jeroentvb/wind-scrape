"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WindguruUtils {
    parseSpotInfo(str) {
        const spotData = str
            .split(',')
            .map(item => item.trim())
            .map(item => (item.split(':')[1] ? item.split(':')[1] : item.split(':')[0]).trim());
        return {
            name: spotData[0],
            coordinates: {
                lat: spotData[1],
                lng: spotData[2]
            },
            altitude: spotData[3],
            temperature: spotData[4]
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
