/* global describe, context, it */

const chai = require('chai')
const expect = chai.expect

const scrape = require('../index.js')
const helper = require('jeroentvb-helper')

describe('scrape.windfinder()', function () {
  context('with string argument', function () {
    it('should return windfinder data as an object', async function () {
      const data = await scrape.windfinder('tarifa')

      expect(data)
        .to.be.an('object')
        .and.to.have.property('days')
        .with.a.lengthOf(3)

      helper.exportToFile('windfinder', data, false)
    })
  })

  context('without an argument', function () {
    it('should return an error', async function () {
      const data = await scrape.windfinder()

      expect(data).to.be.an('error')
    })
  })

  context('with non-string argument', function () {
    it('should throw an error', async function () {
      const data = await scrape.windfinder(2)

      expect(data).to.be.an('error')
    })
  })
})
