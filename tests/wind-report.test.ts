/* global describe, it, expect */

const Report = require('../dist/partials/windfinder-report').default
const mockData = require('../__mocks__/mock-data')

describe('The Report class', () => {
  it('should return the parsed data after calling constructor, extract, parse and get', () => {
    const report = new Report(mockData.windfinder.report.spot, mockData.windfinder.report.html)
      .parse()
      .get()

    expect(report).toEqual(mockData.windfinder.report.data)
  })
})
