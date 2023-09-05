/* global describe, it, expect */

const Windguru = require('../dist/partials/data-parsers/windguru-parser').default;
const mockData = require('./mocks/mock-data');

describe('The windguru class', () => {
   it('should return the parsed data after calling extract, parse and get', () => {
      const windguru = new Windguru(mockData.windguru.html)
         .extract()
         .parse()
         .get();

      expect(windguru).toEqual(mockData.windguru.data);
   });
});
