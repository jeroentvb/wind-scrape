"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.windReport = exports.windy = exports.customWindguru = exports.windguru = exports.windfinder = void 0;
const windfinder_1 = __importDefault(require("./partials/windfinder"));
exports.windfinder = windfinder_1.default;
const windguru_1 = require("./partials/windguru");
Object.defineProperty(exports, "windguru", { enumerable: true, get: function () { return windguru_1.windguru; } });
Object.defineProperty(exports, "customWindguru", { enumerable: true, get: function () { return windguru_1.customWindguru; } });
const windy_1 = __importDefault(require("./partials/windy"));
exports.windy = windy_1.default;
const windfinder_report_1 = __importDefault(require("./partials/windfinder-report"));
exports.windReport = windfinder_report_1.default;
