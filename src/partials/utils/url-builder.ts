import type { Credentials } from '../../interfaces/credentials.js';
import type { Coordinates } from '../../interfaces/coordinates.js';

export function getWindfinderUrl(spotname: string): string {
   return `https://www.windfinder.com/weatherforecast/${spotname}`;
}

export function getWindguruUrl(spot: number | string, model?: string | number): string {
   const windguruModel = model ?? 'all';

   return `http://micro.windguru.cz/?s=${spot}&m=${windguruModel}`;
}

export function getCustomWindguruUrl({ lat, lon }: Coordinates, { username, password }: Credentials, model?: string | number): string {
   const windguruModel = model ?? 'all';

   return `https://micro.windguru.cz/?lat=${lat}&lon=${lon}&m=${windguruModel}&u=${username}&p=${password}`;
}

export function getWindyUrl(lat: string | number, long: string | number): string {
   return `https://www.windy.com/${lat}/${long}/wind?`;
}

export function getWindReportUrl(spotname: string): string {
   return `https://www.windfinder.com/report/${spotname}`;
}
