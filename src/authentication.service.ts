export interface AuthenticationService {
    getApiKey(): Promise<string>;
}
