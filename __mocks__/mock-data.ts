module.exports = {
  windfinder: {
    html: require('./windfinder/html.mock'),
    data: require('./windfinder/windfinder-data.mock'),
    report: {
      html: require('./wind-report/html.mock'),
      data: require('./wind-report/parsed-data.mock'),
      spot: 'maui_honolua_bay'
    }
  },
  windguru: {
    html: require('./windguru/html.mock'),
    data: require('./windguru/parsed-data.mock'),
  },
  windy: {
    html: require('./windy/html.mock'),
    data: require('./windy/parsed-data.mock')
  }
}
