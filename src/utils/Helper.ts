import type {Router} from "vue-router";

export default class Helper {
    public static async goTo(where: string, router: Router): Promise<void> {
        await router.push(where);
    }
}