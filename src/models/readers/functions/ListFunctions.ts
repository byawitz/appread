import Reader from "@/models/Reader";
import type Project from "@/models/Project";

export default class ListFunctions extends Reader {
    constructor(project: Project) {
        super('List Functions', project, 'server');
    }
}
