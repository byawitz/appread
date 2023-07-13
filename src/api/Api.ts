import type {ActionScope} from "@/models/Action";
import * as semver from "semver/preload";

import Client1_0 from './specs/open-api3-1.0.x-client.json';
import Client1_1 from './specs/open-api3-1.1.x-client.json';
import Client1_2 from './specs/open-api3-1.2.x-client.json';
import Client1_3 from './specs/open-api3-1.3.x-client.json';
import Client0_12 from './specs/open-api3-0.12.x-client.json';
import Client0_13 from './specs/open-api3-0.13.x-client.json';
import Client0_14 from './specs/open-api3-0.14.x-client.json';
import Client0_15 from './specs/open-api3-0.15.x-client.json';

import Server1_0 from './specs/open-api3-1.0.x-server.json';
import Server1_1 from './specs/open-api3-1.1.x-server.json';
import Server1_2 from './specs/open-api3-1.2.x-server.json';
import Server1_3 from './specs/open-api3-1.3.x-server.json';
import Server0_12 from './specs/open-api3-0.12.x-server.json';
import Server0_13 from './specs/open-api3-0.13.x-server.json';
import Server0_14 from './specs/open-api3-0.14.x-server.json';
import Server0_15 from './specs/open-api3-0.15.x-server.json';


export default class Api {
    private static apis: Record<ActionScope, Record<any, any>> = {
        'server': {
            '1.0' : Server1_0,
            '1.1' : Server1_1,
            '1.2' : Server1_2,
            '1.3' : Server1_3,
            '0.12': Server0_12,
            '0.13': Server0_13,
            '0.14': Server0_14,
            '0.15': Server0_15,
        },
        'client': {
            '1.0' : Client1_0,
            '1.1' : Client1_1,
            '1.2' : Client1_2,
            '1.3' : Client1_3,
            '0.12': Client0_12,
            '0.13': Client0_13,
            '0.14': Client0_14,
            '0.15': Client0_15,
        },
    }

    private static cached: Record<ActionScope, Record<any, any>> = {
        'client': {},
        'server': {},
    };

    public static giveMeAPI(scope: ActionScope, completeVersion: string) {
        const version = semver.parse(completeVersion);
        const api     = `${version?.major}.${version?.minor}`;

        if (this.cached[scope][api] !== undefined) {
            return this.cached[scope][api];
        }

        const apis: Record<any, any> = {};

        try {
            const apiVersion = this.apis[scope][api];

            Object.entries(apiVersion.paths).forEach((entry: [string, any]) => {
                const [route, endpoints] = entry;

                Object.entries(endpoints).forEach((endpoint: [string, any]) => {
                    const [method, request] = endpoint;

                    if (!apis[request.tags[0]]) {
                        apis[request.tags[0]] = []
                    }

                    apis[request.tags[0]].push({...request, method, route});
                });
            });

            this.cached[scope][api] = apis;
        } catch (e) {
            /* TODO: maybe add logger */
        }

        return apis;
    }
}