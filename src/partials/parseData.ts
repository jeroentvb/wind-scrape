import utils from './utils'

import { ExtractedWindfinderData, WindfinderData, ParsedWindfinderDay, WindfinderDataDay } from '../interfaces/data/windfinder'
import { WindguruData, ExtractedWindguruData, WindguruModelHour } from '../interfaces/data/windguru'
import { ExtractedWindyData, WindyData, WindyModelHour } from '../interfaces/data/windy'
import { ExtractedWindReport, WindReport } from '../interfaces/data/wind-report'

function windfinderData (data: ExtractedWindfinderData): WindfinderData {
  // TODO: refactor this function
  const windfinder: WindfinderData = {
    name: 'Windfinder',
    spot: data.spot,
    days: []
  }

  const days: ParsedWindfinderDay[] = [
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

  days.forEach((day: ParsedWindfinderDay) => {
    let dayData: WindfinderDataDay = {
      date: day.date,
      hours: []
    }

    day.time.forEach((hour, j) => {
      dayData.hours.push({
        hour: day.time[j],
        windspeed: day.windspeed[j],
        windgust: day.windgust[j],
        winddirection: day.winddirection[j],
        temperature: day.temperature[j]
      })
    })

    windfinder.days.push(dayData)
  })

  return windfinder
}

function windguruData (data: ExtractedWindguruData): WindguruData {
  // TODO: refactor this function
  let newData: WindguruData = {
    name: data.name,
    spot: data.spot,
    models: []
  }

  data.models.forEach((model, i) => {
    newData.models[i] = {
      name: model.name,
      number: model.number,
      lastUpdate: model.lastUpdate,
      nextUpdate: model.nextUpdate,
      days: []
    }

    let day: string
    let dayCount = 0

    model.time.forEach((item, j) => {
      let hour: WindguruModelHour = {
        hour: parseInt(model.time[j].substring(3, 5)),
        windspeed: model.windspeed[j],
        windgust: model.windgust[j],
        winddirection: model.winddirection[j],
        temperature: model.temperature[j]
      }

      if (j === 0) {
        newData.models[i].days[0] = {
          date: item.substring(0, 2),
          hours: []
        }
        newData.models[i].days[0].hours.push(hour)
      } else if (item.substring(0, 2) !== day) {
        dayCount++
        newData.models[i].days[dayCount] = {
          date: item.substring(0, 2),
          hours: []
        }
        newData.models[i].days[dayCount].hours.push(hour)
      } else {
        newData.models[i].days[dayCount].hours.push(hour)
      }

      day = item.substring(0, 2)
    })
  })

  return newData
}

function windyData (data: ExtractedWindyData): WindyData {
  let newData: WindyData = {
    name: data.name,
    models: []
  }

  data.models.forEach((model, i) => {
    newData.models[i] = {
      name: model.name,
      days: []
    }

    let day: number;
    let dayCount = 0

    model.time.forEach((item, j) => {
      let hour: WindyModelHour = {
        hour: model.time[j],
        windspeed: model.windspeed[j],
        windgust: model.windgust[j],
        winddirection: model.winddirection[j]
      }

      if (j === 0) {
        newData.models[i].days[0] = {
          date: data.date[0] ? utils.reverseDate(data.date[0]) : null,
          hours: []
        }
        newData.models[i].days[0].hours.push(hour)
      } else if (item < day) {
        dayCount++
        newData.models[i].days[dayCount] = {
          date: data.date[dayCount] ? utils.reverseDate(data.date[dayCount]) : null,
          hours: []
        }
        newData.models[i].days[dayCount].hours.push(hour)
      } else {
        newData.models[i].days[dayCount].hours.push(hour)
      }

      day = item
    })
  })

  return newData
}

function reportData (data: ExtractedWindReport): WindReport {
  data.report = data.report.map(x => {
    if (x.wg) {
      return {
        windspeed: x.ws,
        windgust: x.wg,
        winddirection: x.wd,
        time: x.dtl
      }
    } else {
      return {
        windspeed: x.ws,
        winddirection: x.wd,
        time: x.dtl
      }
    }
  })

  return data
}

export default {
  windfinderData,
  windguruData,
  windyData,
  reportData
}
