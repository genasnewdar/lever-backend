import dotenv from 'dotenv';
import { getSSMParameterByPath } from '../utils/getParameter';

dotenv.config({
    path: `.env${process.env.NODE_ENV === "local" ? `.${process.env.NODE_ENV}` : ""
        }`,
});

const env = process.env;


interface Auth0 {
    auth0Domain: string;
    auth0Audience: string;
    auth0Client: string;
    auth0ClientSecret: string;
    auth0ApiKey: string;
}
interface App {

}

interface config {
    auth0: Auth0;
    app: App;
}

class Config implements config {

    public auth0: Auth0 = {
        auth0Domain: "",
        auth0Audience: "",
        auth0Client: "",
        auth0ClientSecret: "",
        auth0ApiKey: ""
    };

    public app: App = {
    }



    constructor() {
    }

    public async init() {
        process.env.NODE_ENV = process.env.NODE_ENV?.toUpperCase()
        console.log(process.env.NODE_ENV)
        // if (process.env.NODE_ENV === "PROD" || process.env.NODE_ENV === "STG" || process.env.NODE_ENV === "DEV" || process.env.NODE === undefined) {
            const path = "DEV"
            const params = await getSSMParameterByPath(path);
            this.auth0 = {
                auth0Domain: params?.find((x: any) => x.Name === `/${path}/AUTH0_DOMAIN`)?.Value || "",
                auth0Audience: params?.find((x: any) => x.Name === `/${path}/AUTH0_AUDIENCE`)?.Value || "",
                auth0Client: params?.find((x: any) => x.Name === `/${path}/AUTH0_CLIENT`)?.Value || "",
                auth0ClientSecret: params?.find((x: any) => x.Name === `/${path}/AUTH0_CLIENT_SECRET`)?.Value || "",
                auth0ApiKey: params?.find((x: any) => x.Name === `/${path}/AUTH0_API_KEY`)?.Value || ""
            };

            this.app = {
            };

    //     } else {
    //         this.auth0 = {
    //             auth0Domain: env.AUTH0_DOMAIN || "",
    
    //             auth0Audience: env.AUTH0_AUDIENCE || "",
    //             auth0Client: env.AUTH0_CLIENT || "",
    //             auth0ClientSecret: env.AUTH0_CLIENT_SECRET || "",
    //             auth0ApiKey: env.AUTH0_API_KEY || ""
    //         };
    
    //         this.app = {
    //         };
    //     }
    //     console.log(this)
    //     console.log("******* CONFIG initialized *******");
    }
}
        
export default new Config();