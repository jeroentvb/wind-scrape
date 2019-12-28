/* global describe, it, expect */

const utils = require('../dist/partials/utils').default

const mockData = require('../__mocks__/mock-data')

describe('The utils module', () => {
  it('should reverse the date', () => {
    const reversedDate = utils.reverseDate('2019-12-27')

    expect(reversedDate).toEqual('27-12-2019')
  })

  it('should return the data for a windfinder day', () => {
    const parsedWindfinderDay = utils.getWindfinderDay(mockData.windfinder.extractedData, 'one')

    expect(parsedWindfinderDay).toEqual(mockData.windfinder.parsedDay)
  })
})
