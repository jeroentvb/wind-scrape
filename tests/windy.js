/* global describe, context, it */

const chai = require('chai')
const expect = chai.expect

const scrape = require('../index.js')
const helper = require('jeroentvb-helper')

describe('scrape.windy()', function () {
  context('with number arguments', function () {
    it('should return the windy forecast data as an object', async function () {
      this.timeout(30000)

      const data = await scrape.windy(36.012, -5.611)

      expect(data)
        .to.be.an('object')
        .and.to.have.property('models')

      helper.exportToFile('windy', data, false)
    })
  })

  context('with number arguments', function () {
    it('should return the windy forecast data as an object', async function () {
      this.timeout(30000)

      const data = await scrape.windy('36.012', '-5.611')

      expect(data)
        .to.be.an('object')
        .and.to.have.property('models')
    })
  })

  context('without any arguments', function () {
    it('should return an Error', async function () {
      const data = await scrape.windy()

      expect(data)
        .to.be.an('error')
        .and.to.have.property('name', 'Error')
    })
  })

  context('with incorrect type of arguments', function () {
    it('should return a TypeError', async function () {
      const data = await scrape.windy([36.012], [-5.611])

      expect(data)
        .to.be.an('error')
        .and.to.have.property('name', 'TypeError')
    })
  })
})
