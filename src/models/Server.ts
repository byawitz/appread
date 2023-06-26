import Locale from "@/locale/Locale";
import {getClient, Body, ResponseType} from '@tauri-apps/api/http';

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
            const client = await getClient();

            const res: any = await client.get(`${this.https ? 'https' : 'http'}://${this.endpoint}/health/version`, {
                responseType: ResponseType.JSON,
            });
            
            const json = res.data;
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
