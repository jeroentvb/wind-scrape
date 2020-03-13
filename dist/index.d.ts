import { WindfinderData } from './interfaces/windfinder';
import { WindguruData } from './interfaces/windguru';
import { WindyData } from './interfaces/windy';
import { WindReport } from './interfaces/wind-report';
declare function windfinder(spotname: string): Promise<WindfinderData>;
declare function windguru(spot: number | string): Promise<WindguruData>;
declare function windy(lat: string | number, long: string | number): Promise<WindyData | Error>;
declare function windReport(spotname: string): Promise<WindReport | Error>;
export { windfinder, windguru, windy, windReport, WindfinderData, WindguruData, WindyData, WindReport };
