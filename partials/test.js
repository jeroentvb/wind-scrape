const Scrape = require('../index')

const url = {
  windfinder: 'https://www.windfinder.com/weatherforecast/tarifa',
  windguru: 'https://www.windguru.cz/43'
}

switch (process.argv[2]) {
  case 'all':
    Promise.all([
      Scrape.windfinder(url.windfinder),
      Scrape.windguru(url.windguru, [0, 2, 3, 4])
    ])
      .then(res => console.log(res))
      .catch(err => console.error(err))
    break
  case 'windfinder':
    Scrape.windfinder(url.windfinder)
      .then(res => console.log(res))
      .catch(err => console.error(err))
    break
  case 'windguru':
    Scrape.windguru(url.windguru, [0, 2, 3, 4])
      .then(res => console.log(res))
      .catch(err => console.error(err))
    break
  default:
    throw new Error('No test specified.')
}
