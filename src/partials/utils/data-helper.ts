import cheerio from 'cheerio'

export type DataModifierFunction<T> = (el: cheerio.Element, index: number) => T

export default class DataHelper {
  protected $: cheerio.Root

  constructor (html: string) {
    this.$ = cheerio.load(html)
  }

  protected getDataArray<T> ([selector, context, root]: string[], modifier?: DataModifierFunction<T>): T[] {
    return this.$(selector, context, root)
      .map((index, el) => {
        return !!modifier ? modifier(el, index) : parseInt(this.$(el).text()) // TODO fix typing on this
      })
      .get()
  }
}
