import {AuthenticationService} from "./authentication.service";

export class EnvironmentAuthenticationService implements AuthenticationService {
    getApiKey(): string {
        return process.env.CDSAPI_KEY;
    }

}
