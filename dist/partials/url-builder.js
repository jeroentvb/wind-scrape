"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UrlBuilder {
    static windfinder(spotname) {
        return `https://www.windfinder.com/weatherforecast/${spotname}`;
    }
    static windguru(spot) {
        return `http://micro.windguru.cz/?s=${spot}&m=all`;
    }
    static windy(lat, long) {
        return `https://www.windy.com/${lat}/${long}/wind?`;
    }
    static windReport(spotname) {
        return `https://www.windfinder.com/report/${spotname}`;
    }
}
exports.default = UrlBuilder;
