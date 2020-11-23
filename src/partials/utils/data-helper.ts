import cheerio from 'cheerio'

export type DataModifierFunction<T> = (el: CheerioElement) => T

export default class DataHelper {
protected $: CheerioStatic

  constructor (html: string) {
    this.$ = cheerio.load(html)
  }

  protected getDataArray<T> ([selector, context, root]: string[], modifier?: DataModifierFunction<T>): T[] {
    return this.$(selector, context, root)
      .map((_, el) => {
        return !!modifier ? modifier(el) : parseInt(this.$(el).text()) // TODO fix typing on this
      })
      .get()
  }
}