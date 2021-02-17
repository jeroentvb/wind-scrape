import { WindguruData } from '../interfaces/windguru';
import { Coordinates } from '../interfaces/coordinates';
import { Credentials } from '../interfaces/credentials';
declare function windguru(spot: number | string, model?: string | number): Promise<WindguruData>;
declare function customWindguru(coordinates: Coordinates, credentials: Credentials, model?: string | number): Promise<WindguruData>;
export { windguru, customWindguru };
