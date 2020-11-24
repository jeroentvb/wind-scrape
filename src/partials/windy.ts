import WindyUtils from './utils/windy-utils'

import { ExtractedWindyData, WindyData, WindyModelDay, WindyModelHour } from '../interfaces/windy'

export default class Windy extends WindyUtils {
  private extractedData!: ExtractedWindyData
  private parsedData!: WindyData

  constructor (html: string) {
    super(html)

    return this
  }

  extract (): this {
    this.extractedData = {
      name: 'Windy',
      date: this.getDataArray(['.sticky-title-wrapper', '.td-days'], (el) => this.$(el).data('day')),
      models: this.getDataArray(['.legend-left', '.legend-windCombined'], (el) => {
        return {
          name: this.$(el).text(),
          time: this.getDataArray(['td', '.td-hour'], (el) => parseInt(this.$(el).text())),
          windspeed: this.getWindData((el) => {
            const windspeed = this.$(el).contents().filter((_, item) => {
              return item.type === 'text'
            })[0].nodeValue

            return parseInt(windspeed)
          }),
          winddirection: this.getWindData((el) => {    
            const windgust = this.$(el).find('div').css('transform').replace(/\D/g, '')
            return parseInt(windgust)
          }),
          windgust: this.getWindData((el) => parseInt(this.$(el).find('small').text()))
        }
      })
    }

    return this
  }

  parse (): this {
    this.parsedData = {
      name: this.extractedData.name,
      models: this.extractedData.models.map((model) => {  
        // TODO refactor, this code is ugly
        const days: WindyModelDay[] = []
        let previousHour: number;
        let dayIndex = 0
    
        model.time.forEach((hour, j) => {
          const hourData: WindyModelHour = {
            hour: model.time[j],
            windspeed: model.windspeed[j],
            windgust: model.windgust[j],
            winddirection: model.winddirection[j]
          }
  
          if (j === 0) {
            days[0] = {
              date: this.extractedData.date[0] ? this.reverseDate(this.extractedData.date[0] as string) : null,
              hours: []
            }
            days[0].hours.push(hourData)
          } else if (hour < previousHour) {
            dayIndex++
            days[dayIndex] = {
              date: this.extractedData.date[dayIndex] ? this.reverseDate(<string>this.extractedData.date[dayIndex]) : null,
              hours: []
            }
            days[dayIndex].hours.push(hourData)
          } else {
            days[dayIndex].hours.push(hourData)
          }
    
          previousHour = hour
        })

        return {
          name: model.name,
          days
        }
      })
    }

    return this
  }

  get (): WindyData {
    return this.parsedData
  }

}
