const scrape = require('../dist/index')
const helper = require('jeroentvb-helper')

require('dotenv').config()

const url = {
  windfinder: 'tarifa',
  windguru: {
    spot: 43
  },
  customWindguru: {
    coordinates: {
      lat: 20.933591,
      lon: -156.357992
    },
    credentials: {
      username: process.env.WINDGURU_USERNAME,
      password: process.env.WINDGURU_PASSWORD
    }
  },
  windy: {
    lat: '36.012',
    long: '-5.611'
  },
  report: 'maui_honolua_bay'
}

const test = {
  all: () => {
    const promises = [
      scrape.windfinder(url.windfinder),
      scrape.windguru(url.windguru.spot),
      scrape.windy(url.windy.lat, url.windy.long),
      scrape.windReport(url.report)
    ]

    if (url.customWindguru.credentials.username && url.customWindguru.credentials.password) {
      promises.push(scrape.customWindguru(
        url.customWindguru.coordinates,
        url.customWindguru.credentials
      ))
    }

    Promise.all(promises)
      .then(res => {
        console.log(res)
        helper.export.json('allData', res)
      })
      .catch(err => console.error(err))
  },
  windfinder: async spot => {
    try {
      const data = await scrape.windfinder(spot || url.windfinder)

      console.log(data)
      helper.export.json('windfinder', data)
    } catch (err) {
      console.error(err)
    }
  },
  windguru: async () => {
    try {
      const data = await scrape.windguru(url.windguru.spot)

      console.log(data)
      helper.export.json('windguru', data)
    } catch (err) {
      console.error(err)
    }
  },
  customWindguru: async () => {
    try {
      const data = await scrape.customWindguru(
        url.customWindguru.coordinates,
        url.customWindguru.credentials
      )

      console.log(data)
      helper.export.json('custom-windguru', data)
    } catch (err) {
      console.error(err)
    }
  },
  windy: async () => {
    try {
      const data = await scrape.windy(url.windy.lat, url.windy.long)

      console.log(data)
      helper.export.json('windy', data)
    } catch (err) {
      console.error(err)
    }
  },
  windReport: async () => {
    try {
      const data = await scrape.windReport(url.report)

      console.log(data)
      helper.export.json('report', data)
    } catch (err) {
      console.error(err)
    }
  }
}

switch (process.argv[2]) {
  case 'all':
    test.all()
    break
  case 'windfinder':
    test.windfinder(process.argv[3])
    break
  case 'windguru':
    test.windguru()
    break
  case 'customWindguru':
    test.customWindguru()
    break
  case 'windy':
    test.windy()
    break
  case 'report':
    test.windReport()
    break
  default:
    throw new Error('No test specified. Available: all, windfinder, windguru, customWindguru, windy, report')
}
