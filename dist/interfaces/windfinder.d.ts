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
export interface ParsedWindfinderDay {
    date: string;
    time: number[];
    windspeed: number[];
    windgust: number[];
    winddirection: number[];
    temperature: number[];
}
