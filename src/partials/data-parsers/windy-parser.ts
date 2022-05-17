import DataHelper from '../utils/data-helper.js';
import { reverseDate } from '../utils/windy-utils.js';
import type { ExtractedWindyData, WindyModel, WindyModelDay, WindyModelHour } from '../../interfaces/windy.js';

export default class Windy extends DataHelper {
   private extractedData!: ExtractedWindyData;
   private parsedData!: WindyModel[];

   constructor(html: string) {
      super(html);

      return this;
   }

   extract(): this {
      this.extractedData = {
         date: this.getDataArray(['.sticky-title-wrapper', '.td-days'], (el) => this.$(el).data('day')),
         models: this.getDataArray(['.legend-left', '.legend-windCombined'], (el, i) => {
            const windData: { windspeed: number[], windgust: number[], winddirection: number[] } = {
               windspeed: [],
               windgust: [],
               winddirection: []
            };

            this.$('.td-windCombined', '#detail-data-table').each((index, el) => {
               // If selected row is not the same as the current model, don't extract the data
               if (index !== i) return;

               this.$(el).find('td').each((_index, elem) => {
                  const windspeed = (this.$(elem).contents().filter((_, item) => {
                     return item.type === 'text';
                  })[0] as cheerio.TagElement).nodeValue;
                  const windgust = this.$(elem).find('div').css('transform').replace(/\D/g, '');
                  const winddirection = this.$(elem).find('small').text();

                  windData.windspeed.push(parseInt(windspeed));
                  windData.windgust.push(parseInt(winddirection));
                  windData.winddirection.push(parseInt(windgust));
               });
            });

            return {
               name: this.$(el).text(),
               time: this.getDataArray(['td', '.td-hour'], (el) => parseInt(this.$(el).text())),
               ...windData
            };
         })
      };

      return this;
   }

   parse(): this {
      this.parsedData = this.extractedData.models.map((model) => {
         const hours: WindyModelHour[] = model.time.map((hour, i) => ({
            hour,
            windspeed: model.windspeed[i],
            windgust: model.windgust[i],
            winddirection: model.winddirection[i]
         }));
         const days: WindyModelDay[] = [];

         let dayIndex = 0;
         let previousHour: WindyModelHour;

         hours.forEach((hour, i) => {
            if (i === 0) {
               days[0] = {
                  date: this.extractedData.date[0] ? reverseDate(this.extractedData.date[0]) : null,
                  hours: []
               };

               days[0].hours.push(hour);
            } else if (hour.hour < previousHour.hour) {
               // New day
               dayIndex++;

               days[dayIndex] = {
                  date: this.extractedData.date[dayIndex] ? reverseDate(this.extractedData.date[dayIndex] as string) : null,
                  hours: []
               };

               days[dayIndex].hours.push(hour);
            } else {
               days[dayIndex].hours.push(hour);
            }

            previousHour = hour;
         });

         return {
            name: model.name,
            days
         };
      });

      return this;
   }

   get(): WindyModel[] {
      return this.parsedData;
   }

}
