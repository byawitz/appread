export default class SingleLocale {
    public name: string;
    public title: string;
    public localeStrings: Record<string, string>;
    public isRtl: boolean;


    constructor(name: string, title: string, localeStrings: Record<string, string>, isRtl: boolean = false) {
        this.name         = name;
        this.title        = title;
        this.localeStrings = localeStrings;
        this.isRtl        = isRtl;
    }
}