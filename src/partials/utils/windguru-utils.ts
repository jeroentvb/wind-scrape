import { ExtractedWindguruSpotData, SpotInfo } from '../../interfaces/windguru'

export default class WindguruUtils {
  protected parseSpotInfo (str: string): SpotInfo {
    const spotDataString = str
      .split(',')
      .map(item => item.trim())
      .filter((item) => item.includes(':'))
      .map(item => item.trim())
      .map(item => item.split(':').map(item2 => '\"' + item2.trim() + '\"').join(':'))
      .join(',')

    const spotData: ExtractedWindguruSpotData = JSON.parse('{' + spotDataString + '}')
    const spotName = str.split(',')[0].trim()

    return {
      name: spotName.includes(':') ? undefined : spotName,
      coordinates: {
        lat: spotData.lat,
        lng: spotData.lon
      },
      altitude: spotData.alt,
      temperature: spotData.SST
    }
  }

  protected parseModelInfo (str: string): string {
    return str.split('(')[0].trim()
  }

  protected parseLegend (str: string): string[] {
    return str.split(' ').filter(item => item).map(item => item.toLocaleLowerCase())
  }

  protected getDate (str: string): string {
    return str.split(' ').splice(0, 2).join(' ').replace('.', '')
  }

  protected getHour (str: string): string {
    return str.split(' ')[2].replace('h', '')
  }

}
