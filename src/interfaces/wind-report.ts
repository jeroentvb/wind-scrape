// parsed wind report data
export interface WindReport {
  name: string;
  spot: string;
  report: WindReportItem[];
}

export interface WindReportItem {
  windspeed?: number;
  windgust?: number;
  winddirection?: number;
  time: string;
}

// extracted wind report data
export interface ExtractedWindReport {
  name: string;
  spot: string;
  report: ExtractedWindReportItem[]
}

export interface ExtractedWindReportItem {
  ws?: number;
  wg?: number;
  wd?: number;
  at?: number;
  ap?: number;
  dtl?: string;
  dtl_s?: string;
}
