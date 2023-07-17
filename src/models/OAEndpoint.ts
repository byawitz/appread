declare type OAType = 'object' | 'string' | 'array' | 'location' | 'integer' | 'boolean' | 'number' | 'graphql' | 'upload'
declare type OABody = { 'name': string, 'type': OAType, isArray: boolean, description: string, };
declare type OAParameter = { 'name': string, 'type': OAType, description: string };
declare type OAPart = { 'name': string, 'type': OAType, description: string }
export default class OAEndpoint {
    public method: string            = '';
    public route: string             = '';
    public description: string       = '';
    public body: OABody[]            = [];
    public parameters: OAParameter[] = [];
    public parts: OAPart[]           = [];

    public static createOAE(endpoint: any): OAEndpoint {
        const oae = new OAEndpoint();

        oae.route       = endpoint.route;
        oae.method      = endpoint.method;
        oae.description = endpoint.description;

        try {
            Object.entries(endpoint.requestBody.content['application/json'].schema.properties).forEach((property: [string, any]) => {
                const [name, data] = entry;

                oae.body.push({
                    name       : name,
                    type       : entry.type,
                    description: entry.description,

                });

            });
        } catch (e: any) {
            /* Nope */
        }

        return oae;
    }
}