import SingleLocale from "../models/SingleLocale";
import en from './locales/en.json';
import he from './locales/he.json';

const LOCALE_KEY = 'locale';

const LOCALE_EN = 'en';
const LOCALE_HE = 'he';

declare type LocaleReplaces = { what: string, replace: string };

export default class Locale {
    public static availableLocales: Record<string, SingleLocale> = {
        [LOCALE_EN]: new SingleLocale(LOCALE_EN, 'English', en),
        [LOCALE_HE]: new SingleLocale(LOCALE_HE, 'עברית', he, true),
    }

    private static currentLocale = LOCALE_EN;

    public static init() {
        this.setLocale(localStorage.getItem(LOCALE_KEY) ?? LOCALE_EN);
    }

    public static locale(str: string): string {
        return this.availableLocales[this.currentLocale].localeStrings[str] ?? str;
    }

    public static localeReplace(str: string, replaces: LocaleReplaces[]): string {
        let translated = this.availableLocales[this.currentLocale].localeStrings[str] ?? str;

        replaces.forEach((replace) => {
            translated = translated.replace(replace.what, replace.replace)
        })

        return translated;
    }

    public static setLocale(locale: string) {
        if (this.availableLocales[locale] === undefined) {
            locale = LOCALE_EN;
        }

        this.currentLocale = locale;

        if (this.availableLocales[locale].isRtl) {
            document.querySelector('html')!.dir = 'rtl';
        }
    }

    public static getCurrentLocale() {
        return this.currentLocale;
    }

    public static saveLocale(locale: string) {
        localStorage.setItem(LOCALE_KEY, locale);
        location.reload();
    }
}
Locale.init();
