import Locale from "@/locale/Locale";

export default class Server {
    public title: string;
    public https: boolean;
    public version: string;
    public endpoint: string;


    constructor(title: string = '', endpoint: string = '', https = true) {
        this.title    = title;
        this.endpoint = endpoint;
        this.version  = '';
        this.https    = https;
    }


    public async checkAppwrite(): Promise<boolean> {
        try {
            const res  = await fetch(`${this.https ? 'https' : 'http'}://${this.endpoint}/health/version`);
            const json = await res.json();

            if (json['version']) {
                this.version = json['version'];
                return true;
            }
        } catch (e) {
            /**/
        }

        return false;
    }

    public static headings() {
        return [
            Locale.locale('title'),
            Locale.locale('url'),
            Locale.locale('Appwrite_version'),
            Locale.locale('secure'),
        ];
    }

    public static dataFields() {
        return [
            'title',
            'endpoint',
            'version',
            'secure'
        ];
    }
}
