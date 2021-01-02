export default class UrlBuilder {
  static windfinder (spotname: string): string {
    return `https://www.windfinder.com/weatherforecast/${spotname}`
  }

  static windguru (spot: number | string): string {
    return `http://micro.windguru.cz/?s=${spot}&m=all`
  }

  static windy (lat: string | number, long: string | number): string {
    return `https://www.windy.com/${lat}/${long}/wind?`
  }

  static windReport (spotname: string): string {
    return `https://www.windfinder.com/report/${spotname}`
  }
}
