import utils from './utils'

import { ExtractedWindyData, WindyData, WindyModelHour } from '../interfaces/windy'
import { ExtractedWindReport, WindReport, WindReportItem } from '../interfaces/wind-report'

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
  windy,
  windReport
}
