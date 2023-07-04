import Locale from "@/locale/Locale";
import {getClient, ResponseType} from "@tauri-apps/api/http";
import Helper from "@/utils/Helper";
import Server from "@/models/Server";

export default class Project {
    public server: Server;
    public title: string;
    public projectId: string;
    public apiKey: string;

    constructor(server: Server = new Server(), title: string = '', projectId: string = '', apiKey: string = '') {
        this.server    = server;
        this.title     = title;
        this.apiKey    = apiKey;
        this.projectId = projectId;
    }

    public async checkProject(): Promise<boolean> {
        try {

            const client = await getClient();

            const res: any = await client.get(`${Helper.getFullEndpoint(this.server)}/health`, {
                responseType: ResponseType.JSON,
                headers     : {
                    'x-appwrite-project': this.projectId,
                    'x-appwrite-key'    : this.apiKey,
                }
            });

            const json = res.data;

            if (json['status'] === 'pass') {
                return true;
            }
        } catch (e) {
            console.log(e);
            /* TODO: maybe add logger */
        }

        return false;
    }

    public static headings() {
        return [
            Locale.locale('title'),
            Locale.locale('server'),
            Locale.locale('project id'),
            Locale.locale('apiKey'),
        ];
    }

    public static dataFields() {
        return [
            'title',
            'server',
            'projectId',
            'apiKey',
        ];
    }
}
