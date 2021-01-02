"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const windfinder_utils_1 = __importDefault(require("./utils/windfinder-utils"));
class Windfinder extends windfinder_utils_1.default {
    constructor(html) {
        super(html);
        return this;
    }
    extract() {
        const winddirectionDegrees = this.getDataArray(['.directionarrow', '.units-wd-sym'], (el) => {
            return parseInt(this.$(el).attr('title').replace('°', ' '));
        });
        const winddirectionLetters = winddirectionDegrees.map(windDirection => this.getWindDirection(windDirection));
        this.extractedData = {
            name: 'Windfinder',
            spot: this.$('#spotheader-spotname').contents().first().text(),
            date: this.getDataArray(['h4', '.weathertable__header'], (el) => this.$(el).text()),
            time: this.getDataArray(['.value', '.data-time'], (el) => parseInt(this.$(el).text().replace('h', ''))),
            windspeed: this.getDataArray(['.units-ws', '.data--major']),
            windgust: this.getDataArray(['.units-ws', '.data-gusts']),
            winddirectionDegrees,
            winddirectionLetters,
            temperature: this.getDataArray(['.units-at', '.data-temp']),
            wavedirection: this.getDataArray(['.directionarrow', '.units-wad-sym'], (el) => {
                return parseInt(this.$(el).attr('title').replace('°', ' '));
            }),
            waveheight: this.getDataArray(['.units-wh', '.data-waveheight'], (el) => parseFloat(this.$(el).text())),
            waveinterval: this.getDataArray(['.data-wavefreq'])
        };
        return this;
    }
    parse() {
        this.parsedData = {
            name: 'Windfinder',
            spot: this.extractedData.spot,
            days: this.extractedData.date
                .map((_, i) => this.getWindfinderDay(i))
                .map(day => {
                return {
                    date: day.date,
                    hours: day.time.map((hour, i) => {
                        return {
                            hour: hour,
                            windspeed: day.windspeed[i],
                            windgust: day.windgust[i],
                            winddirectionDegrees: day.winddirectionDegrees[i],
                            winddirectionLetters: day.winddirectionLetters[i],
                            temperature: day.temperature[i],
                            wavedirection: day.wavedirection[i],
                            waveheight: day.waveheight[i],
                            waveinterval: day.waveinterval[i]
                        };
                    })
                };
            })
        };
        return this;
    }
    get() {
        return this.parsedData;
    }
    getWindfinderDay(index) {
        return {
            date: this.extractedData.date[index],
            time: this.sliceDay(this.extractedData.time, index),
            windspeed: this.sliceDay(this.extractedData.windspeed, index),
            windgust: this.sliceDay(this.extractedData.windgust, index),
            winddirectionDegrees: this.sliceDay(this.extractedData.winddirectionDegrees, index),
            winddirectionLetters: this.sliceDay(this.extractedData.winddirectionLetters, index),
            temperature: this.sliceDay(this.extractedData.temperature, index),
            wavedirection: this.sliceDay(this.extractedData.wavedirection, index),
            waveheight: this.sliceDay(this.extractedData.waveheight, index),
            waveinterval: this.sliceDay(this.extractedData.waveinterval, index)
        };
    }
}
exports.default = Windfinder;
