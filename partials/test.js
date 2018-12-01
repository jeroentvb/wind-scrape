const scrape = require('../index')
const helper = require('jeroentvb-helper')

const url = {
  windfinder: 'tarifa',
  windguru: '43',
  windy: {
    lat: '36.012',
    long: '-5.611'
  }
}

switch (process.argv[2]) {
  case 'all':
    Promise.all([
      scrape.windfinder(url.windfinder),
      scrape.windguru(url.windguru, [0, 2, 3, 4]),
      scrape.windy(url.windy.lat, url.windy.long)
    ])
      .then(res => {
        console.log(res)
        helper.exportToFile('allData', res)
      })
      .catch(err => console.error(err))
    break
  case 'windfinder':
    scrape.windfinder(url.windfinder)
      .then(res => {
        console.log(res)
        helper.exportToFile('windfinder', res)
      })
      .catch(err => console.error(err))
    break
  case 'windguru':
    scrape.windguru(url.windguru, [0, 2, 3, 4])
      .then(res => {
        console.log(res)
        helper.exportToFile('windguru', res)
      })
      .catch(err => console.error(err))
    break
  case 'windy':
    scrape.windy(url.windy.lat, url.windy.long)
      .then(res => {
        console.log(res)
        helper.exportToFile('windy', res)
      })
      .catch(err => console.error(err))
    break
  default:
    throw new Error('No test specified.')
}
