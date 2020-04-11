import utils from './utils'

import { ExtractedWindfinderData, WindfinderData, ParsedWindfinderDay, WindfinderDataDay } from '../interfaces/windfinder'
import { WindguruData, ExtractedWindguruData, WindguruModelHour, WindguruModelDay } from '../interfaces/windguru'
import { ExtractedWindyData, WindyData, WindyModelHour } from '../interfaces/windy'
import { ExtractedWindReport, WindReport, WindReportItem } from '../interfaces/wind-report'

function windfinder (data: ExtractedWindfinderData): WindfinderData {
  // TODO: refactor this function
  const windfinder: WindfinderData = {
    name: 'Windfinder',
    spot: data.spot,
    days: []
  }

  const days: ParsedWindfinderDay[] = [
    utils.getWindfinderDay(data, 'one'),
    utils.getWindfinderDay(data, 'two'),
    utils.getWindfinderDay(data, 'three')
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
        temperature: day.temperature[j],
        wavedirection: day.wavedirection[j],
        waveheight: day.waveheight[j],
        waveinterval: day.waveinterval[j]
      })
    })

    windfinder.days.push(dayData)
  })

  return windfinder
}

function windguru (extractedData: ExtractedWindguruData): WindguruData {
  // Group the data by day
  const models = extractedData.models.map(model => {
    const days: WindguruModelDay[] = []
    let currentDay: string = ''
    let count = -1

    // Group the data by hour
    model.data.forEach(modelData => {
      const parsedDate = utils.windguru.getDate(modelData.date)

      if (currentDay !== parsedDate) {
        currentDay = parsedDate
        count++
        days[count] = {
          date: parsedDate,
          hours: []
        }
      }

      modelData.hour = utils.windguru.getHour(modelData.date)
      delete modelData.date

      days[count].hours.push(modelData)
    })

    return {
      name: model.name,
      days
    }
  })

  return {
    spot: extractedData.spot,
    models
  }
}

function windy (data: ExtractedWindyData): WindyData {
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
          date: data.date[0] ? utils.reverseDate(data.date[0] as string) : null,
          hours: []
        }
        newData.models[i].days[0].hours.push(hour)
      } else if (item < day) {
        dayCount++
        newData.models[i].days[dayCount] = {
          date: data.date[dayCount] ? utils.reverseDate(<string>data.date[dayCount]) : null,
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

function windReport (data: ExtractedWindReport): WindReport {
  (data.report as WindReportItem[]) = data.report.map(x => {
    if (x.wg) {
      return {
        windspeed: x.ws,
        windgust: x.wg,
        winddirection: x.wd,
        time: x.dtl
      } as WindReportItem
    } else {
      return{
        windspeed: x.ws,
        winddirection: x.wd,
        time: x.dtl
      } as WindReportItem
    }
  })
  
  return data as WindReport
}

export default {
  windfinder,
  windguru,
  windy,
  windReport
}
