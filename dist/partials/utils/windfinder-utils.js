"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_helper_1 = __importDefault(require("./data-helper"));
class WindfinderUtils extends data_helper_1.default {
    constructor(html) {
        super(html);
        this.windDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    }
    sliceDay(array, index) {
        switch (index) {
            case 0: {
                return array.slice(0, 24);
            }
            case 1: {
                return array.slice(24, 48);
            }
            case 2: {
                return array.slice(48, 71);
            }
            default: {
                return array;
            }
        }
    }
    getWindDirection(direction) {
        const val = Math.floor((direction / 22.5) + 0.5);
        return this.windDirections[(val % 16)];
    }
}
exports.default = WindfinderUtils;
