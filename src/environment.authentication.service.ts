import {AuthenticationService} from "./authentication.service";

export class EnvironmentAuthenticationService implements AuthenticationService {
    async getApiKey(): Promise<string> {
        return process.env.CDSAPI_KEY;
    }

}
