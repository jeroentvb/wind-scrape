/* global describe, context, it */

const chai = require('chai')
const expect = chai.expect

const scrape = require('../index.js')
const helper = require('jeroentvb-helper')

describe('scrape.windguru()', function () {
  context('with number and array argument', function () {
    it('should return the windguru forecast data as an object', async function () {
      this.timeout(30000)

      const data = await scrape.windguru(43, [0, 2, 3, 4])

      expect(data)
        .to.be.an('object')
        .and.to.have.property('models')
        .with.a.lengthOf(4)

      helper.exportToFile('windguru', data, false)
    })
  })

  context('without any arguments', function () {
    it('should return an Error', async function () {
      const data = await scrape.windguru()

      expect(data)
        .to.be.an('error')
        .and.to.have.property('name', 'Error')
    })
  })

  context('with an incorrect type for spotnumber', function () {
    it('should return a TypeError', async function () {
      const data = await scrape.windguru([43], [0, 2, 3, 4])

      expect(data)
        .to.be.an('error')
        .and.to.have.property('name', 'TypeError')
    })
  })

  context('with an incorrect type for modeNumbers', function () {
    it('should throw a TypeError', async function () {
      const data = await scrape.windguru(43, { 0: 0, 1: 2, 2: 3, 3: 4 })

      expect(data)
        .to.be.an('error')
        .and.to.have.property('name', 'TypeError')
    })
  })
})
