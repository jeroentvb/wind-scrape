"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_helper_1 = __importDefault(require("./data-helper"));
class WindyUtils extends data_helper_1.default {
    constructor(html) {
        super(html);
    }
    reverseDate(date) {
        return date.split('-').reverse().join('-');
    }
}
exports.default = WindyUtils;
