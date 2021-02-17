import WindguruUtils from '../utils/windguru-utils';
import { WindguruData } from '../../interfaces/windguru';
export default class Windguru extends WindguruUtils {
    readonly data: string;
    private extractedData;
    private parsedData;
    constructor(data: string);
    extract(): this;
    parse(): this;
    get(): WindguruData;
    private extractModel;
}
