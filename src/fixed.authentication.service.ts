import {AuthenticationService} from "./authentication.service";

export class FixedAuthenticationService implements AuthenticationService {
    constructor(private apiKey: string) {

    }
    async getApiKey(): Promise<string> {
        return this.apiKey;
    }
}
