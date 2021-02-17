import { Credentials } from '../../interfaces/credentials'
import { Coordinates } from '../../interfaces/coordinates'

export default class UrlBuilder {
  static windfinder (spotname: string): string {
    return `https://www.windfinder.com/weatherforecast/${spotname}`
  }

  static windguru (spot: number | string, model?: string | number): string {
    const windguruModel = model ?? 'all'

    return `http://micro.windguru.cz/?s=${spot}&m=${windguruModel}`
  }

  static customWindguru ({ lat, lon }: Coordinates, { username, password }: Credentials, model?: string | number): string {
    const windguruModel = model ?? 'all'
    
    return `https://micro.windguru.cz/?lat=${lat}&lon=${lon}&m=${windguruModel}&u=${username}&p=${password}`
  }

  static windy (lat: string | number, long: string | number): string {
    return `https://www.windy.com/${lat}/${long}/wind?`
  }

  static windReport (spotname: string): string {
    return `https://www.windfinder.com/report/${spotname}`
  }
}
