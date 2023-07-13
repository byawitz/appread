import {describe, expect, test} from "vitest";
import Helper from "@/utils/Helper";
import Server from "@/models/Server";

const noProtocolEndpoint = 'cloud.appwrite.io/v1';
const httpEndpoint       = 'http://cloud.appwrite.io/v1';
const httpsEndpoint      = 'https://cloud.appwrite.io/v1';

describe('Getting Appwrite endpoint', () => {
    test('Get final endpoint without protocol prefix.', () => {
        expect(Helper.getAppwriteEndpoint('https://cloud.appwrite.io')).toEqual(noProtocolEndpoint)
        expect(Helper.getAppwriteEndpoint('http://cloud.appwrite.io/v2')).toEqual(noProtocolEndpoint)
        expect(Helper.getAppwriteEndpoint('cloud.appwrite.io/b42')).toEqual(noProtocolEndpoint)
        expect(Helper.getAppwriteEndpoint('http://cloud.appwrite.io')).toEqual(noProtocolEndpoint)
        expect(Helper.getAppwriteEndpoint('///////////cloud.appwrite.io///////')).toEqual(noProtocolEndpoint)
    });

    test('Get final endpoint ', () => {
        const http  = new Server('', noProtocolEndpoint, false);
        const https = new Server('', noProtocolEndpoint, true);

        expect(Helper.getFullEndpoint(http)).toEqual(httpEndpoint);
        expect(Helper.getFullEndpoint(https)).toEqual(httpsEndpoint);
    });
});
