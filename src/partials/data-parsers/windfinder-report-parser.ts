import { ExtractedWindReport } from '../../interfaces/wind-report';
import { WindReport } from '../../interfaces/wind-report';

export default class Report {
  readonly data: ExtractedWindReport
  readonly spot: string
  private parsedData!: WindReport

  constructor (spot: string, data: ExtractedWindReport) {
    this.spot = spot
    this.data = data
  }

  parse (): this {
    const report = this.data.map(datapoint => ({
      windspeed: datapoint.ws,
      winddirection: datapoint.wd,
      time: datapoint.dtl,
      ...(datapoint.wg && { windgust: datapoint.wg }),
      ...(datapoint.at && { temperature: datapoint.at }),
      ...(datapoint.ap && { airPressure: datapoint.ap })
    }))

    this.parsedData = {
      name: 'Windfinder report',
      spot: this.spot,
      report
    }
    
    return this
  }

  get (): WindReport {
    return this.parsedData
  }

}
