import { ExtractedWindfinderData } from '../interfaces/windfinder';
import { ExtractedWindguruData } from '../interfaces/windguru';
import { ExtractedWindyData } from '../interfaces/windy';
declare function windfinderData(html: string): ExtractedWindfinderData;
declare function windguruData(data: string): ExtractedWindguruData;
declare function windyData(html: string): ExtractedWindyData;
declare const _default: {
    windguruData: typeof windguruData;
    windfinderData: typeof windfinderData;
    windyData: typeof windyData;
};
export default _default;
