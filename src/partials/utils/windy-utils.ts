import DataHelper from './data-helper';

export default class WindyUtils extends DataHelper {
   constructor(html: string) {
      super(html);
   }

   protected reverseDate(date: string) {
      return date.split('-').reverse().join('-');
   }
}
