// parsed Windy data
export interface WindyData {
  name: string;
  models: WindyModel[];
  url?: string;
}

export interface WindyModel {
  name: string;
  days: WindyModelDay[];
}

export interface WindyModelDay {
  date: string | undefined;
  hours: WindyModelHour[];
}

export interface WindyModelHour {
  hour: number;
  windspeed: number;
  windgust: number;
  winddirection: number;
}

// extracted Windy data
export interface ExtractedWindyData {
  name: string;
  date: (string | undefined)[];
  models: ExtractedWindyModelData[];
}

export interface ExtractedWindyModelData {
  name: string;
  time?: number[];
  windspeed?: number[];
  windgust?: number[];
  winddirection?: number[];
}