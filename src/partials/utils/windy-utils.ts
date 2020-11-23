import DataHelper, { DataModifierFunction } from './data-helper'

export default class WindyUtils extends DataHelper {
  constructor (html: string) {
    super(html)
  }

  protected reverseDate (date: string) {
    return date.split('-').reverse().join('-')
  }

  protected getWindData <T>(callback: DataModifierFunction<T>): T[] {
    return this.getDataArray(['td' ,'.td-windCombined'], callback)
  }

}
