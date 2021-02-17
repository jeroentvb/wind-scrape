import WindyUtils from '../utils/windy-utils';
import { WindyData } from '../../interfaces/windy';
export default class Windy extends WindyUtils {
    private extractedData;
    private parsedData;
    constructor(html: string);
    extract(): this;
    parse(): this;
    get(): WindyData;
}
