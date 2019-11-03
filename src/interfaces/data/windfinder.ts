// Extracted and parsed windfinder data
export interface windfinderData {
  name: string;
  spot: string;
  days: windfinderDataDay[]
}

export interface windfinderDataDay {
  date: string;
  hours: windfinderDataHour[];
}

export interface windfinderDataHour {
  hour: number;
  windspeed: number;
  windgust: number;
  winddirection: number;
  temperature: number;
}

// extracted windfinder data
export interface extractedWindfinderData {
  name: string;
  spot: string;
  date: string[];
  time: number[];
  windspeed: number[];
  windgust: number[];
  winddirection: number[];
  temperature: number[];
}

// partially parsed windfinder days
export interface parsedWindfinderDay {
  date: string;
  time: number[];
  windspeed: number[];
  windgust: number[];
  winddirection: number[];
  temperature: number[];
}