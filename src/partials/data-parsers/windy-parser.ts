import WindyUtils from '../utils/windy-utils'

import { ExtractedWindyData, WindyData, WindyModelDay, WindyModelHour } from '../../interfaces/windy'

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
      models: this.getDataArray(['.legend-left', '.legend-windCombined'], (el, i) => {
        const windData: { windspeed: number[], windgust: number[], winddirection: number[] } = {
          windspeed: [],
          windgust: [],
          winddirection: []
        }

        this.$('.td-windCombined', '#detail-data-table').each((index, el) => {
          // If selected row is not the same as the current model, don't extract the data
          if (index !== i) return

          this.$(el).find('td').each((_index, elem) => {
            const windspeed = (this.$(elem).contents().filter((_, item) => {
              return item.type === 'text'
            })[0] as cheerio.TagElement).nodeValue
            const windgust = this.$(elem).find('div').css('transform').replace(/\D/g, '')
            const winddirection = this.$(elem).find('small').text()
  
            windData.windspeed.push(parseInt(windspeed))
            windData.windgust.push(parseInt(winddirection))
            windData.winddirection.push(parseInt(windgust))
          })
        })

        return {
          name: this.$(el).text(),
          time: this.getDataArray(['td', '.td-hour'], (el) => parseInt(this.$(el).text())),
          ...windData
        }
      })
    }

    return this
  }

  parse (): this {
    this.parsedData = {
      name: this.extractedData.name,
      models: this.extractedData.models.map((model) => {
        const hours: WindyModelHour[] = model.time.map((hour, i) => ({
          hour,
          windspeed: model.windspeed[i],
          windgust: model.windgust[i],
          winddirection: model.winddirection[i]
        }))
        const days: WindyModelDay[] = []

        let dayIndex = 0
        let previousHour: WindyModelHour

        hours.forEach((hour, i) => {
          if (i === 0) {
            days[0] = {
              date: this.extractedData.date[0] ? this.reverseDate(this.extractedData.date[0]) : null,
              hours: []
            }

            days[0].hours.push(hour)
          } else if (hour.hour < previousHour.hour) {
            // New day
            dayIndex++

            days[dayIndex] = {
              date: this.extractedData.date[dayIndex] ? this.reverseDate(this.extractedData.date[dayIndex] as string) : null,
              hours: []
            }

            days[dayIndex].hours.push(hour)
          } else {
            days[dayIndex].hours.push(hour)
          }

          previousHour = hour
        })
        

        // let dayIndex2 = 0
        // const test2: WindyModelDay[] = [{
        //   date: this.extractedData.date[0] ? this.reverseDate(this.extractedData.date[0] as string) : null,
        //   hours: []
        // }]

        // hours.reduce((prev, current, i) => {
        //   if (prev.hour > current.hour) {
        //     dayIndex2++

        //     test2[dayIndex2] = {
        //       date: this.extractedData.date[dayIndex2] ? this.reverseDate(this.extractedData.date[dayIndex2] as string) : null,
        //       hours: []
        //     }
        //     test2[dayIndex2].hours.push(current)
        //   } else {
        //     test2[dayIndex2].hours.push(current)
        //   }

        //   return current
        // })

        // TODO refactor, this code is ugly
        // const days: WindyModelDay[] = []
        // let previousHour: number;
        // let dayIndex = 0
    
        // model.time.forEach((hour, j) => {
        //   const hourData: WindyModelHour = {
        //     hour: model.time[j],
        //     windspeed: model.windspeed[j],
        //     windgust: model.windgust[j],
        //     winddirection: model.winddirection[j]
        //   }
  
        //   if (j === 0) {
        //     days[0] = {
        //       date: this.extractedData.date[0] ? this.reverseDate(this.extractedData.date[0] as string) : null,
        //       hours: []
        //     }
        //     days[0].hours.push(hourData)
        //   } else if (hour < previousHour) {
        //     dayIndex++
        //     days[dayIndex] = {
        //       date: this.extractedData.date[dayIndex] ? this.reverseDate(<string>this.extractedData.date[dayIndex]) : null,
        //       hours: []
        //     }
        //     days[dayIndex].hours.push(hourData)
        //   } else {
        //     days[dayIndex].hours.push(hourData)
        //   }
    
        //   previousHour = hour
        // })

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
