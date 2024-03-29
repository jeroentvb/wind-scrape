import WindfinderUtils from '../utils/windfinder-utils';

import { ExtractedWindfinderData, ParsedWindfinderDay, WindfinderData } from '../../interfaces/windfinder';

export default class Windfinder extends WindfinderUtils {
   private extractedData!: ExtractedWindfinderData;
   private parsedData!: WindfinderData;

   constructor(html: string) {
      super(html);

      return this;
   }

   extract(): this {
      const winddirectionDegrees = this.getDataArray(['.directionarrow', '.units-wd-sym'], (el) => {
         return parseInt((this.$(el).attr('title') as string).replace('°', ' '));
      });
      const winddirectionLetters = winddirectionDegrees.map(windDirection => this.getWindDirection(windDirection));

      this.extractedData = {
         name: 'Windfinder',
         spot: this.$('#spotheader-spotname').contents().first().text(),
         date: this.getDataArray(['h3', '.weathertable__header'], (el) => this.$(el).text().trim()),
         time: this.getDataArray<number>(['.value', '.data-time'], (el) => parseInt(this.$(el).text().replace('h', ''))),
         windspeed: this.getDataArray<number>(['.units-ws', '.data--major']),
         windgust: this.getDataArray<number>(['.units-ws', '.data-gusts']),
         winddirectionDegrees,
         winddirectionLetters,
         temperature: this.getDataArray<number>(['.units-at', '.data-temp']),
         wavedirection: this.getDataArray(['.directionarrow', '.units-wad-sym'], (el) => {
            return parseInt((this.$(el).attr('title') as string).replace('°', ' '));
         }),
         waveheight: this.getDataArray(['.units-wh', '.data-waveheight'], (el) => parseFloat(this.$(el).text())),
         waveinterval: this.getDataArray<number>(['.data-wavefreq'])
      };

      return this;
   }

   parse(): this {
      this.parsedData = {
         name: 'Windfinder',
         spot: this.extractedData.spot,
         days: this.extractedData.date
            .map((_, i) => this.getWindfinderDay(i))
            .map(day => {
               return {
                  date: day.date,
                  hours: day.time.map((hour, i) => {
                     return {
                        hour: hour,
                        windspeed: day.windspeed[i],
                        windgust: day.windgust[i],
                        winddirectionDegrees: day.winddirectionDegrees[i],
                        winddirectionLetters: day.winddirectionLetters[i],
                        temperature: day.temperature[i],
                        wavedirection: day.wavedirection[i],
                        waveheight: day.waveheight[i],
                        waveinterval: day.waveinterval[i]
                     };
                  })
               };
            })
      };

      return this;
   }

   get(): WindfinderData {
      return this.parsedData;
   }

   private getWindfinderDay(index: number): ParsedWindfinderDay {
      return {
         date: this.extractedData.date[index],
         time: this.sliceDay(this.extractedData.time, index),
         windspeed: this.sliceDay(this.extractedData.windspeed, index),
         windgust: this.sliceDay(this.extractedData.windgust, index),
         winddirectionDegrees: this.sliceDay(this.extractedData.winddirectionDegrees, index),
         winddirectionLetters: this.sliceDay(this.extractedData.winddirectionLetters, index),
         temperature: this.sliceDay(this.extractedData.temperature, index),
         wavedirection: this.sliceDay(this.extractedData.wavedirection, index),
         waveheight: this.sliceDay(this.extractedData.waveheight, index),
         waveinterval: this.sliceDay(this.extractedData.waveinterval, index)
      };
   }

}
