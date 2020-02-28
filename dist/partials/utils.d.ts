import { ExtractedWindfinderData, ParsedWindfinderDay } from '../interfaces/windfinder';
import { SpotInfo } from '../interfaces/windguru';
declare function reverseDate(date: string): string;
declare function getWindfinderDay(data: ExtractedWindfinderData, day: 'one' | 'two' | 'three'): ParsedWindfinderDay;
declare function parseSpotInfo(str: string): SpotInfo;
declare function parseModelInfo(str: string): string;
declare function parseLegend(str: string): string[];
declare function getDate(str: string): string;
declare function getHour(str: string): string;
declare function createRequestUrl(spot: number | string): string;
declare const _default: {
    reverseDate: typeof reverseDate;
    getWindfinderDay: typeof getWindfinderDay;
    windguru: {
        parseSpotInfo: typeof parseSpotInfo;
        parseModelInfo: typeof parseModelInfo;
        parseLegend: typeof parseLegend;
        getDate: typeof getDate;
        getHour: typeof getHour;
    };
    createRequestUrl: typeof createRequestUrl;
};
export default _default;
