module.exports = {
  windfinder: {
    html: require('./windfinder/html.mock'),
    extractedData: require('./windfinder/extracted-data.mock'),
    parsedDay: require('./windfinder/parsed-day-data.mock'),
    parsedData: require('./windfinder/parsed-data.mock'),
    report: {
      extractedData: require('./wind-report/extracted-data.mock'),
      parsedData: require('./wind-report/parsed-data.mock')
    }
  },
  windguru: {
    html: require('./windguru/html.mock'),
    extractedData: require('./windguru/extracted-data.mock'),
    parsedData: require('./windguru/parsed-data.mock')
  },
  windy: {
    html: require('./windy/html.mock'),
    extractedData: require('./windy/extracted-data.mock'),
    parsedData: require('./windy/parsed-data.mock')
  }
}
