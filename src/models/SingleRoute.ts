import type {RouteComponent} from "vue-router";

export default class SingleRoute {
    public path: string;
    public name: string;
    public icon: string;
    public component: RouteComponent;


    constructor(path: string, name: string, icon: string, component: RouteComponent) {
        this.path      = path;
        this.name      = name;
        this.icon      = icon;
        this.component = component;
    }
}