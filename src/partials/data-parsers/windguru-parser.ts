import WindguruUtils from '../utils/windguru-utils';

import { ExtractedWindguruModelData, SpotInfo, WindguruData, WindguruModelDay } from '../../interfaces/windguru';
import { ExtractedWindguruData } from '../../interfaces/windguru';

export default class Windguru extends WindguruUtils {
   readonly data: string;
   private extractedData!: ExtractedWindguruData;
   private parsedData!: WindguruData;

   constructor(data: string) {
      super();

      this.data = data;
   }

   extract(): this {
      let foundPreTag = false;
      let spot: SpotInfo = {
         name: '',
         coordinates: {
            lat: '',
            lng: ''
         },
         altitude: '',
         temperature: ''
      };

      const filteredData = this.data
         .split('\n')
      // Get the data from the HTML
         .filter(row => {
            if (row.includes('</pre>')) foundPreTag = false;

            if (foundPreTag && row !== '') return true;

            if (row.includes('<pre>')) foundPreTag = true;
         })
      // Filter unneeded rows from the data, including the spot info
         .filter((row, i) => {
            if (i === 1) spot = this.parseSpotInfo(row);
            if (i < 2) return false;
            return true;
         });

      // Group the modeldata in its own object
      const rawData = this.extractModel(filteredData);

      const models = rawData.map((modelData): ExtractedWindguruModelData => {
         let modelInfo = '';
         let legend: string[] = [];

         // Filter the modelInfo and legend from the data
         const extractedModelData = modelData.filter((row, i) => {
            if (i === 0) modelInfo = this.parseModelInfo(row);
            if (i === 1) legend = this.parseLegend(row);

            if (i < 3) return;

            return true;
         })
         // Split the rows into an array of data
            .map(row => {
               return row
                  .trim()
                  .split(/  +/g);
            })
         // Transform the array of values into an object
            .map(values => {
               const dataObj: Record<string, string> = {};

               legend.forEach((item, i) => {
                  dataObj[item] = values[i];
               });

               return dataObj;
            });

         return {
            name: modelInfo,
            data: extractedModelData
         };
      });

      this.extractedData = {
         spot,
         models
      };

      return this;
   }

   parse(): this {
      // Group the data by day
      const models = this.extractedData.models.map(model => {
         const days: WindguruModelDay[] = [];
         let currentDay = '';
         let count = -1;

         // Group the data by hour
         model.data.forEach(modelData => {
            const parsedDate = this.getDate(modelData.date);

            if (currentDay !== parsedDate) {
               currentDay = parsedDate;
               count++;
               days[count] = {
                  date: parsedDate,
                  hours: []
               };
            }

            modelData.hour = this.getHour(modelData.date);
            delete modelData.date;

            days[count].hours.push(modelData);
         });

         return {
            name: model.name,
            days
         };
      });

      this.parsedData = {
         spot: this.extractedData.spot,
         models
      };

      return this;
   }

   get(): WindguruData {
      return this.parsedData;
   }

   private extractModel(data: string[]): string[][] {
      const extractedData: string[][] = [];
      let index = -1;

      data.forEach(row => {
         if (row[0] !== ' ') {
            index++;
            extractedData[index] = [];
         }

         extractedData[index].push(row);
      });

      return extractedData;
   }

}
