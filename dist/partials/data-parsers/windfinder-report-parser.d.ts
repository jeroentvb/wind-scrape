import { ExtractedWindReport } from '../../interfaces/wind-report';
import { WindReport } from '../../interfaces/wind-report';
export default class Report {
    readonly data: ExtractedWindReport;
    readonly spot: string;
    private parsedData;
    constructor(spot: string, data: ExtractedWindReport);
    parse(): this;
    get(): WindReport;
}
