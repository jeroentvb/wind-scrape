/* global describe, it, expect */

const Windy = require('../dist/partials/data-parsers/windy-parser').default;
const mockData = require('./mocks/mock-data');

describe('The windy class', () => {
   it('should return the parsed data after calling constructor, extract, parse and get', () => {
      const windy = new Windy(mockData.windy.html)
         .extract()
         .parse()
         .get();

      expect(windy).toEqual(mockData.windy.data);
   });
});
