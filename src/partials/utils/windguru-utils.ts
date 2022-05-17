import type { ExtractedWindguruSpotData, SpotInfo } from '../../interfaces/windguru.js';

export function parseSpotInfo(str: string): SpotInfo {
   const spotDataString = str
      .split(',')
      .map(item => item.trim())
      .filter((item) => item.includes(':'))
      .map(item => item.trim())
      .map(item => item.split(':').map(item2 => '"' + item2.trim() + '"').join(':'))
      .join(',');

   const spotData: ExtractedWindguruSpotData = JSON.parse('{' + spotDataString + '}');
   const spotName = str.split(',')[0].trim();

   return {
      name: spotName.includes(':') ? undefined : spotName,
      coordinates: {
         lat: spotData.lat,
         lng: spotData.lon
      },
      altitude: spotData.alt,
      temperature: spotData.SST
   };
}

export function parseModelInfo(str: string): string {
   return str.split('(')[0].trim();
}

export function parseLegend(str: string): string[] {
   return str.split(' ').filter(item => item).map(item => item.toLocaleLowerCase());
}

export function getDate(str: string): string {
   return str.split(' ').splice(0, 2).join(' ').replace('.', '');
}

export function getHour(str: string): string {
   return str.split(' ')[2].replace('h', '');
}
