import type {Router} from "vue-router";

export default class Helper {
    public static async goTo(where: string, router: Router): Promise<void> {
        await router.push(where);
    }

    public static getAppwriteEndpoint(url: string) {
        url = url.replace('http://', '');
        url = url.replace('https://', '');
        url = url.replace(/\/.+/g, '');
        url = url.replace(/\/+$/g, '');

        return `${url}/v1`;
    }
}