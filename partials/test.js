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

class Test {
  static all () {
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
  }

  static windfinder () {
    scrape.windfinder(url.windfinder)
      .then(res => {
        console.log(res)
        helper.exportToFile('windfinder', res)
      })
      .catch(err => console.error(err))
  }

  static windguru () {
    scrape.windguru(url.windguru.spot, url.windguru.modelNumbers)
      .then(res => {
        console.log(res)
        helper.exportToFile('windguru', res)
      })
      .catch(err => console.error(err))
  }

  static windy () {
    scrape.windy(url.windy.lat, url.windy.long)
      .then(res => {
        console.log(res)
        helper.exportToFile('windy', res)
      })
      .catch(err => console.error(err))
  }
}

switch (process.argv[2]) {
  case 'all':
    Test.all()
    break
  case 'windfinder':
    Test.windfinder()
    break
  case 'windguru':
    Test.windguru()
    break
  case 'windy':
    Test.windy()
    break
  default:
    throw new Error('No test specified.')
}
