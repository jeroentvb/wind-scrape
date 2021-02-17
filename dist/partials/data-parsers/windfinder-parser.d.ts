import WindfinderUtils from '../utils/windfinder-utils';
import { WindfinderData } from '../../interfaces/windfinder';
export default class Windfinder extends WindfinderUtils {
    private extractedData;
    private parsedData;
    constructor(html: string);
    extract(): this;
    parse(): this;
    get(): WindfinderData;
    private getWindfinderDay;
}
