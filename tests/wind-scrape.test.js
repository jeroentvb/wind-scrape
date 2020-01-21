/* global describe, it, expect, jest */

// const scrape = require('../dist/index')

// const extract = require('../dist/partials/extract-data').default
// jest.mock('../dist/partials/extract-data')
// const parse = require('../dist/partials/parse-data').default

// jest.mock('node-fetch')
// const fetch = require('node-fetch')
// const { Response } = jest.requireActual('node-fetch')

// const mockData = require('../__mocks__/mock-data')

// describe('The windfinder scrape function', () => {
//   beforeAll(() => {
//     extract.mockImplementation(() => {
//       return {
//         windfinder: () => mockData.windfinder.extractedData
//       }
//     })
//   })

//   it('should return an Error when no spot is given', async () => {
//     await expect(scrape.windfinder()).rejects.toThrow()
//   })

//   it('should return a TypeError when the give spot is not a string', async () => {
//     await expect(scrape.windfinder(12)).rejects.toThrow()
//     await expect(scrape.windfinder(true)).rejects.toThrow()
//     await expect(scrape.windfinder({ test: 'tarifa' })).rejects.toThrow()
//   })

//   fit('should return the WindfinderData', async () => {
//     fetch.mockReturnValue(Promise.resolve(new Response(mockData.windfinder.html)))
//     // MOCK MODULES USED

//     const windfinderData = await scrape.windfinder('tarifa')

//     expect(windfinderData).toEqual(mockData.windfinder.parsedData)
//   })
// })

// describe('The windguru scrape function', () => {
//   it('should return an Error when no spot is given', async () => {
//     await expect(scrape.windguru()).rejects.toThrow()
//   })

//   it('should return an Error if the spot is not a number or string', async () => {
//     await expect(scrape.windguru(true, [1, 2])).rejects.toThrow()
//     await expect(scrape.windguru({ test: '43' }, [1, 2])).rejects.toThrow()
//   })

//   it('should return an Error when no modelNumber is given', async () => {
//     await expect(scrape.windguru(43)).rejects.toThrow()
//   })
// })
