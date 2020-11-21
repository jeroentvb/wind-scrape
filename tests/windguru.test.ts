/* global describe, it, expect */

const Windguru = require('../dist/partials/windguru').default
const mockData = require('../__mocks__/mock-data')

describe('The windguru class', () => {
  it('should return the parsed data after calling extract, parse and get', () => {
    const windguru = new Windguru(mockData.windguru.html)
      .extract()
      .parse()
      .get()

    expect(windguru).toEqual(mockData.windguru.parsedData)
  })
})
