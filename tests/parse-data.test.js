/* global describe, it, expect */

const parse = require('../dist/partials/parseData').default

const mockData = require('../__mocks__/mock-data')

describe('The parse-data module', () => {
  it('windfinderData should return WindfinderData ', () => {
    const windfinderData = parse.windfinderData(mockData.windfinder.extractedData)

    expect(windfinderData).toEqual(mockData.windfinder.parsedData)
  })

  it('windguruData should return WindguruData', () => {
    const windguruData = parse.windguruData(mockData.windguru.extractedData)

    expect(windguruData).toEqual(mockData.windguru.parsedData)
  })

  it('windyData should return WindyData', () => {
    const windyData = parse.windyData(mockData.windy.extractedData)

    expect(windyData).toEqual(mockData.windy.parsedData)
  })

  it('reportData should return WindReport', () => {
    const reportData = parse.reportData(mockData.windfinder.report.extractedData)

    expect(reportData).toEqual(mockData.windfinder.report.parsedData)
  })
})
