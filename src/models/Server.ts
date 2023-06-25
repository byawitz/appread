import Locale from "@/locale/Locale";
import Helper from "@/utils/Helper";

export default class Server {
    public title: string;
    public endpoint: string;
    public version: string = '';


    constructor(title: string = '', endpoint: string = '') {
        this.title    = title;
        this.endpoint = endpoint;
    }


    public async checkAppwrite(): Promise<boolean> {
        const appwrite = Helper.getAppwriteEndpoint(this.endpoint)

        try {
            const res  = await fetch(`https://${appwrite}/health/version`)
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
        ];
    }

    public static dataFields() {
        return [
            'title',
            'endpoint',
            'version'
        ];
    }
}
