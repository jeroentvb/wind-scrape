/* global describe, it, expect */

const Windy = require('../dist/partials/windy').default
const mockData = require('../__mocks__/mock-data')

describe('The windy class', () => {
  it('should return the parsed data after calling constructor, extract, parse and get', () => {
    const windy = new Windy(mockData.windy.html)
      .extract()
      .parse()
      .get()

    expect(windy).toEqual(mockData.windy.data)
  })
})
