"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
class DataHelper {
    constructor(html) {
        this.$ = cheerio_1.default.load(html);
    }
    getDataArray([selector, context, root], modifier) {
        return this.$(selector, context, root)
            .map((index, el) => {
            return modifier ? modifier(el, index) : parseInt(this.$(el).text()); // TODO fix typing on this
        })
            .get();
    }
}
exports.default = DataHelper;
