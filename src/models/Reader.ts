import type Project from "@/models/Project";
import type {ReaderType} from "@/models/types";


export default class Reader {
    public name: string;
    public project: Project;

    public icon: string = '';

    private type: ReaderType;

    constructor(name: string, project: Project, type: ReaderType = 'client') {
        this.name    = name;
        this.project = project;

        this.type = type;
    }
}
