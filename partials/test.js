const scrape = require('../index')
const helper = require('jeroentvb-helper')

const url = {
  windfinder: 'tarifa',
  windguru: {
    spot: '43',
    modelNumbers: [0, 2, 3, 4]
  },
  windy: {
    lat: '36.012',
    long: '-5.611'
  }
}

const test = {
  all: () => {
    Promise.all([
      scrape.windfinder(url.windfinder),
      scrape.windguru(url.windguru.spot, url.windguru.modelNumbers),
      scrape.windy(url.windy.lat, url.windy.long)
    ])
      .then(res => {
        console.log(res)
        helper.exportToFile('allData', res)
      })
      .catch(err => console.error(err))
  },
  windfinder: async () => {
    try {
      const data = await scrape.windfinder(url.windfinder)

      console.log(data)
      helper.exportToFile('windfinder', data)
    } catch (err) {
      console.error(err)
    }
  },
  windguru: async () => {
    try {
      const data = await scrape.windguru(url.windguru.spot, url.windguru.modelNumbers)

      console.log(data)
      helper.exportToFile('windguru', data)
    } catch (err) {
      console.error(err)
    }
  },
  windy: async () => {
    try {
      const data = await scrape.windy(url.windy.lat, url.windy.long)

      console.log(data)
      helper.exportToFile('windy', data)
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
    test.windfinder()
    break
  case 'windguru':
    test.windguru()
    break
  case 'windy':
    test.windy()
    break
  default:
    throw new Error('No test specified.')
}
