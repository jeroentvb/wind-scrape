import DataHelper from './data-helper';

export default class WindfinderUtils extends DataHelper {
   private readonly windDirections = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

   constructor(html: string) {
      super(html);
   }

   protected sliceDay<T>(array: T[], index: number): T[] {
      switch (index) {
         case 0: {
            return array.slice(0, 24);
         }
         case 1: {
            return array.slice(24, 48);
         }
         case 2: {
            return array.slice(48, 71);
         }
         default: {
            return array;
         }
      }
   }

   protected getWindDirection(direction: number): string {
      const val = Math.floor((direction / 22.5) + 0.5);
      return this.windDirections[(val % 16)];
   }

}