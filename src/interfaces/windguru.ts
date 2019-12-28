// parsed Windguru data
export interface WindguruData {
  name: string;
  spot: string;
  models: WindguruModel[];
  url?: string;
}

export interface WindguruModel {
  name: string;
  number: number;
  lastUpdate: string;
  nextUpdate: string;
  days: WindguruModelDay[];
}

export interface WindguruModelDay {
  date: string;
  hours: WindguruModelHour[];
}

export interface WindguruModelHour {
  hour: number;
  windspeed: number;
  windgust: number;
  winddirection: number;
  temperature: number;
}

// Extracted Windguru data
export interface ExtractedWindguruData {
  name: string;
  spot: string;
  models: ExtractedWindguruModelData[];
}

export interface ExtractedWindguruModelData {
  name: string;
  lastUpdate: string;
  nextUpdate: string;
  number: number;
  time: string[];
  windspeed: number[];
  windgust: number[];
  winddirection: number[];
  temperature: number[];
}
