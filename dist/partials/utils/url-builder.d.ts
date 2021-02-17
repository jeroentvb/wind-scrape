import { Credentials } from '../../interfaces/credentials';
import { Coordinates } from '../../interfaces/coordinates';
export default class UrlBuilder {
    static windfinder(spotname: string): string;
    static windguru(spot: number | string, model?: string | number): string;
    static customWindguru({ lat, lon }: Coordinates, { username, password }: Credentials, model?: string | number): string;
    static windy(lat: string | number, long: string | number): string;
    static windReport(spotname: string): string;
}
