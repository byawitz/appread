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

    public static iconForModule(module: string) {
        switch (module.toLowerCase()) {
            case 'account':
                return 'fa-user';
            case 'avatars':
                return 'fa-image';
            case 'databases':
                return 'fa-database';
            case 'functions':
                return 'fa-bolt';
            case 'graphql':
                return 'fa-q';
            case 'locale':
                return 'fa-language';
            case 'storage':
                return 'fa-hard-drive';
            case 'teams':
                return 'fa-users';
            case 'health':
                return 'fa-heart-pulse';
            case 'users':
                return 'fa-user-tie';
        }
    }
}