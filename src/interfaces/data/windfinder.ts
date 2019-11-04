// Extracted and parsed Windfinder data
export interface WindfinderData {
  name: string;
  spot: string;
  days: WindfinderDataDay[];
}

export interface WindfinderDataDay {
  date: string;
  hours: WindfinderDataHour[];
}

export interface WindfinderDataHour {
  hour: number;
  windspeed: number;
  windgust: number;
  winddirection: number;
  temperature: number;
}

// extracted Windfinder data
export interface ExtractedWindfinderData {
  name: string;
  spot: string;
  date: string[];
  time: number[];
  windspeed: number[];
  windgust: number[];
  winddirection: number[];
  temperature: number[];
}

// partially parsed Windfinder days
export interface ParsedWindfinderDay {
  date: string;
  time: number[];
  windspeed: number[];
  windgust: number[];
  winddirection: number[];
  temperature: number[];
}