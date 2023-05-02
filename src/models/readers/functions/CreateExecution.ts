import Reader from "@/models/Reader";
import type Project from "@/models/Project";
import type {ReaderType} from "@/models/types";

export default class CreateExecution extends Reader {
    constructor(project: Project, type: ReaderType = 'client') {
        super('Create Execution', project, type);
    }
}
