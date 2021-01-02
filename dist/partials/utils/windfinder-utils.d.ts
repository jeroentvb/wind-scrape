import DataHelper from './data-helper';
export default class WindfinderUtils extends DataHelper {
    private readonly windDirections;
    constructor(html: string);
    protected sliceDay<T>(array: T[], index: number): T[];
    protected getWindDirection(direction: number): string;
}
