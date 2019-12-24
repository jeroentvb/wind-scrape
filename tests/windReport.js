/* global describe, context, it */

const chai = require('chai')
const expect = chai.expect

const scrape = require('../index.js')
const helper = require('jeroentvb-helper')

describe('scrape.windReport()', function () {
  context('with string argument', function () {
    it('should return the wind report as an object', async function () {
      this.timeout(30000)

      const data = await scrape.windReport('tarifa')

      expect(data)
        .to.be.an('object')
        .and.to.have.property('report')

      helper.exportToFile('windReport', data, false)
    })
  })

  context('without an argument', function () {
    it('should return an error', async function () {
      const data = await scrape.windReport()

      expect(data)
        .to.be.an('error')
        .and.to.have.property('name', 'Error')
    })
  })

  context('with an invalid argument', function () {
    it('should return a TypeError', async function () {
      const data = await scrape.windReport(43)

      expect(data)
        .to.be.an('error')
        .and.to.have.property('name', 'TypeError')
    })
  })
})
