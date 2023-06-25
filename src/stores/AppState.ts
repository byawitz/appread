import type Project from "@/models/Project";
import type Server from "@/models/Server";
import type Action from "@/models/Action";
import type Flow from "@/models/Flow";

export default class AppState {
    public actions: Action[] = [];
    public flows: Flow[]     = [];

    public projects: Project[] = [];
    public servers: Server[]   = [];

    public isLightTheme = false;
}