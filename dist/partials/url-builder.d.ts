export default class UrlBuilder {
    static windfinder(spotname: string): string;
    static windguru(spot: number | string): string;
    static windy(lat: string | number, long: string | number): string;
    static windReport(spotname: string): string;
}
