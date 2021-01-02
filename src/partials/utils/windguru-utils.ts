import { SpotInfo } from '../../interfaces/windguru'

export default class WindguruUtils {
  protected parseSpotInfo (str: string): SpotInfo {
    const spotData =  str
      .split(',')
      .map(item => item.trim())
      .map(item => (item.split(':')[1] ? item.split(':')[1] : item.split(':')[0]).trim())

    return {
      name: spotData[0],
      coordinates: {
        lat: spotData[1],
        lng: spotData[2]
      },
      altitude: spotData[3],
      temperature: spotData[4]
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
