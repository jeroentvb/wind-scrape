import { SpotInfo } from '../../interfaces/windguru';
export default class WindguruUtils {
    protected parseSpotInfo(str: string): SpotInfo;
    protected parseModelInfo(str: string): string;
    protected parseLegend(str: string): string[];
    protected getDate(str: string): string;
    protected getHour(str: string): string;
}
