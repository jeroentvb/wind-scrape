import { ExtractedWindfinderData, WindfinderData } from '../interfaces/windfinder';
import { WindguruData, ExtractedWindguruData } from '../interfaces/windguru';
import { ExtractedWindyData, WindyData } from '../interfaces/windy';
import { ExtractedWindReport, WindReport } from '../interfaces/wind-report';
declare function windfinder(data: ExtractedWindfinderData): WindfinderData;
declare function windguru(extractedData: ExtractedWindguruData): WindguruData;
declare function windy(data: ExtractedWindyData): WindyData;
declare function windReport(data: ExtractedWindReport): WindReport;
declare const _default: {
    windfinder: typeof windfinder;
    windguru: typeof windguru;
    windy: typeof windy;
    windReport: typeof windReport;
};
export default _default;
