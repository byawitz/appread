import type Project from "@/models/Project";
import type Server from "@/models/Server";
import type Action from "@/models/Action";
import type Flow from "@/models/Flow";

export default class AppState {
    public flows: Flow[]     = [];
    public actions: Action[] = [];

    public servers: Server[]   = [];
    public projects: Project[] = [];

    public isLightTheme = false;
}