import {AuthenticationService} from "./authentication.service";

export class FixedAuthenticationService implements AuthenticationService {
    constructor(private apiKey: string) {

    }
    getApiKey(): string {
        return this.apiKey;
    }
}
