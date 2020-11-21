/* global describe, it, expect */

const parse = require('../dist/partials/parser').default

const mockData = require('../__mocks__/mock-data')

describe('The parse-data module', () => {
  // it('windfinderData should return WindfinderData ', () => {
  //   const windfinderData = parse.windfinder(mockData.windfinder.extractedData)

  //   expect(windfinderData).toEqual(mockData.windfinder.parsedData)
  // })

  it('windguruData should return WindguruData', () => {
    const windguruData = parse.windguru(mockData.windguru.extractedData)

    expect(windguruData).toEqual(mockData.windguru.parsedData)
  })

  it('windyData should return WindyData', () => {
    const windyData = parse.windy(mockData.windy.extractedData)

    expect(windyData).toEqual(mockData.windy.parsedData)
  })

  it('reportData should return WindReport', () => {
    const reportData = parse.windReport(mockData.windfinder.report.extractedData)

    expect(reportData).toEqual(mockData.windfinder.report.parsedData)
  })
})
