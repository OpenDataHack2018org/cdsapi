import {DataRequest} from "./data.request";
import {DataResponse} from "./data.response";
import {AuthenticationService} from "./authentication.service";
import {DataOptions} from "./data.options";
import {RequestState} from "./request.state";
import {HttpUtils} from "./http.utils";
import {JsonResult} from "./json.result";
export class Client {
    constructor(private authenticationService: AuthenticationService,
                private httpUtils: HttpUtils,
                protected endpoint: string =  "https://cds.climate.copernicus.eu/api/v2",
                protected sleepPeriod: number = 1000,
                protected jsonEndpoint: string =
                    "https://ug3idxbga3.execute-api.eu-west-1.amazonaws.com/prod/convert") {
    }

    async sleep(period: number): Promise<void> {
        await new Promise(resolve => {
            setTimeout(resolve, period);
        });
    }

    async requestGrib(request: DataRequest): Promise<DataResponse> {
        const url = this.toUrl(request);
        let result = await this.post(url, request.options);
        while (result.state === RequestState.running ||
                result.state === RequestState.queued ) {
            await this.sleep(this.sleepPeriod);
            result = await this.post(url, request.options);
        }
        return result;

    }

    toUrl(request: DataRequest): string {
        return `${this.endpoint}/resources/${request.name}`;
    }

    async post(url: string, options: DataOptions): Promise<DataResponse> {
        const apiKey = this.authenticationService.getApiKey();
        const result = await this.httpUtils.post<DataOptions, DataResponse>(url, options, apiKey);
        return result;
    }

    async requestJsonLink(input: DataResponse): Promise<JsonResult> {
        const url = `${this.jsonEndpoint}?url=${input.location}`;
        const result  = await this.httpUtils.get(url);
        return result;
    }

}
