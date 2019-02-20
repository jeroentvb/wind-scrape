const utils = require('./utils')

function windfinderData (data) {
  const windfinder = {
    name: 'Windfinder',
    spot: data.spot,
    days: [
      {
        date: data.date[0],
        time: utils.sliceDay.one(data.time),
        windspeed: utils.sliceDay.one(data.windspeed),
        windgust: utils.sliceDay.one(data.windgust),
        winddirection: utils.sliceDay.one(data.winddirection),
        temperature: utils.sliceDay.one(data.temperature)
      },
      {
        date: data.date[1],
        time: utils.sliceDay.two(data.time),
        windspeed: utils.sliceDay.two(data.windspeed),
        windgust: utils.sliceDay.two(data.windgust),
        winddirection: utils.sliceDay.two(data.winddirection),
        temperature: utils.sliceDay.two(data.temperature)
      },
      {
        date: data.date[2],
        time: utils.sliceDay.three(data.time),
        windspeed: utils.sliceDay.three(data.windspeed),
        windgust: utils.sliceDay.three(data.windgust),
        winddirection: utils.sliceDay.three(data.winddirection),
        temperature: utils.sliceDay.three(data.temperature)
      }
    ]
  }

  return windfinder
}

module.exports = {
  windfinderData
}
