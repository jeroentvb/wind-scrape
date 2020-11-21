/* global describe, it, expect */

const extract = require('../dist/partials/extract-data').default

const mockData = require('../__mocks__/mock-data')

describe('The extract data module', () => {
  // it('windfinderData should return ExtractedWindfinderData', () => {
  //   const extractedWindfinderData = extract.windfinderData(mockData.windfinder.html)

  //   expect(extractedWindfinderData).toEqual(mockData.windfinder.extractedData)
  // })

  it('windguruModel should return the ExtractedWindguruData', () => {
    const extractedWindguruData = extract.windguruData(mockData.windguru.html)

    expect(extractedWindguruData).toEqual(mockData.windguru.extractedData)
  })

  it('windyData should return the ExtractedWindyData', () => {
    const extractedWindyData = extract.windyData(mockData.windy.html)

    expect(extractedWindyData).toEqual(mockData.windy.extractedData)
  })
})
