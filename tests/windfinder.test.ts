/* global describe, it, expect */

const Windfinder = require('../dist/partials/windfinder').default
const mockData = require('../__mocks__/mock-data')

describe('The windfinder class', () => {
  it('should return the parsed data after calling constructor, extract, parse and get', () => {
    const windfinder = new Windfinder(mockData.windfinder.html)
      .extract()
      .parse()
      .get()

    expect(windfinder).toEqual(mockData.windfinder.data)
  })
})
