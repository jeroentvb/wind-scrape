export interface WindguruData {
    spot: SpotInfo;
    models: WindguruModel[];
}
export interface SpotInfo {
    name: string;
    coordinates: {
        lat: string;
        lng: string;
    };
    altitude: string;
    temperature: string;
}
export interface WindguruModel {
    name: string;
    days: WindguruModelDay[];
}
export interface WindguruModelDay {
    date: string;
    hours: WindguruModelHour[];
}
export interface WindguruModelHour {
    [key: string]: string;
}
export interface ExtractedWindguruData {
    spot: SpotInfo;
    models: ExtractedWindguruModelData[];
}
export interface ExtractedWindguruModelData {
    name: string;
    data: {
        [key: string]: string;
    }[];
}
