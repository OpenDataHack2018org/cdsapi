import {GotJSONOptions, post, get} from "got";

export class HttpUtils {
    async post<I extends object = any, O = any>(url: string, payload?: I, auth?: string, headers?: any): Promise<O> {
        const result = await post(url, {
            body: payload,
            headers,
            json: true,
            auth
        });
        return result.body as any as O;
    }

    async get<I extends object = any, O = any>(url: string, payload?: I, auth?: string, headers?: any): Promise<O> {
        const result = await get(url, {
            headers,
            body: payload,
            auth,
            json: true
        });
        return result.body;
    }
}
