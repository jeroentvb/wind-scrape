import { WIND_DIRECTIONS } from '../../constants/index.js';

export function sliceDay<T>(array: T[], index: number): T[] {
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

export function getWindDirection(direction: number): string {
   const val = Math.floor((direction / 22.5) + 0.5);
   return WIND_DIRECTIONS[(val % 16)];
}
