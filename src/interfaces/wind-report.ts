export interface WindReport {
  name: string
  spot: string
  report: WindReportItem[]
}

export interface WindReportItem {
  windspeed?: number
  windgust?: number
  winddirection?: number
  time: string
  temperature?: number
  airPressure?: number
}

export type ExtractedWindReport = {
  ws?: number
  wg?: number
  wd?: number
  at?: number
  ap?: number
  dtl: string
  dtl_s?: string
}[]
