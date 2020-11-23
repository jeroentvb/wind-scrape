import { ExtractedWindReport, WindReport, WindReportItem } from '../interfaces/wind-report'

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
  windReport
}
