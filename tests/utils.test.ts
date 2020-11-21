/* global describe, it, expect */

const utils = require('../dist/partials/utils').default

const mockData = require('../__mocks__/mock-data')

describe('The utils module', () => {
  it('should reverse the date', () => {
    const reversedDate = utils.reverseDate('2019-12-27')

    expect(reversedDate).toEqual('27-12-2019')
  })

  it('should parse the spot info', () => {
    const spotInfo = utils.windguru.parseSpotInfo(mockData.windguru.spotString)

    expect(spotInfo).toEqual(mockData.windguru.spotInfo)
  })

  it('should parse the legend', () => {
    const legend = utils.windguru.parseLegend(mockData.windguru.legendString)

    expect(legend).toEqual(mockData.windguru.legend)
  })

  it('should get the date', () => {
    const date = utils.windguru.getDate(mockData.windguru.fullDateTime)

    expect(date).toEqual(mockData.windguru.date)
  })

  it('should get the hour', () => {
    const date = utils.windguru.getHour(mockData.windguru.fullDateTime)

    expect(date).toEqual(mockData.windguru.hour)
  })

  it('should create a request url', () => {
    const url = utils.createRequestUrl(43)

    expect(url).toEqual(mockData.windguru.url)
  })
})
