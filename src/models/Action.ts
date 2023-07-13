export type ActionScope = 'client' | 'server';

export default class Action {
    public type: string        = '';
    public name: string        = '';
    public version: string     = '';
    public projectName: string = '';
    public scope: ActionScope  = 'client';


    constructor(type: string = '', name: string = '', version: string = '', projectName: string = '', scope: ActionScope = 'client') {
        this.type        = type;
        this.name        = name;
        this.version     = version;
        this.projectName = projectName;
        this.scope       = scope;
    }
}