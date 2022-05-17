export interface WindyModel {
  name: string;
  days: WindyModelDay[];
}

export interface WindyModelDay {
  date: string | null;
  hours: WindyModelHour[];
}

export interface WindyModelHour {
  hour: number;
  windspeed: number;
  windgust: number;
  winddirection: number;
}

export interface ExtractedWindyData {
  date: (string | undefined)[];
  models: ExtractedWindyModelData[];
}

export interface ExtractedWindyModelData {
  name: string;
  time: number[];
  windspeed: number[];
  windgust: number[];
  winddirection: number[];
}