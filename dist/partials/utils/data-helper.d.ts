/// <reference types="cheerio" />
export declare type DataModifierFunction<T> = (el: cheerio.Element, index: number) => T;
export default class DataHelper {
    protected $: cheerio.Root;
    constructor(html: string);
    protected getDataArray<T>([selector, context, root]: string[], modifier?: DataModifierFunction<T>): T[];
}
