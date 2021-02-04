export default class UrlBuilder {
  static windfinder (spotname: string): string {
    return `https://www.windfinder.com/weatherforecast/${spotname}`
  }

  static windguru (spot: number | string, model?: string | number): string {
    const windguruModel = model ?? 'all'

    return `http://micro.windguru.cz/?s=${spot}&m=${windguruModel}`
  }

  static windy (lat: string | number, long: string | number): string {
    return `https://www.windy.com/${lat}/${long}/wind?`
  }

  static windReport (spotname: string): string {
    return `https://www.windfinder.com/report/${spotname}`
  }
}
