"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UrlBuilder {
    static windfinder(spotname) {
        return `https://www.windfinder.com/weatherforecast/${spotname}`;
    }
    static windguru(spot, model) {
        const windguruModel = model !== null && model !== void 0 ? model : 'all';
        return `http://micro.windguru.cz/?s=${spot}&m=${windguruModel}`;
    }
    static customWindguru({ lat, lon }, { username, password }, model) {
        const windguruModel = model !== null && model !== void 0 ? model : 'all';
        return `https://micro.windguru.cz/?lat=${lat}&lon=${lon}&m=${windguruModel}&u=${username}&p=${password}`;
    }
    static windy(lat, long) {
        return `https://www.windy.com/${lat}/${long}/wind?`;
    }
    static windReport(spotname) {
        return `https://www.windfinder.com/report/${spotname}`;
    }
}
exports.default = UrlBuilder;
