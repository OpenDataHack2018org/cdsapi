import {GotJSONOptions, post, get} from "got";

export class HttpUtils {
    async post<I extends object = any, O = any>(url: string, payload?: I, auth?: string, headers?: any): Promise<O> {
        const result = await post(url, {
            body: JSON.stringify(payload),
            headers,
            auth
        });
        return this.toJson(result.body);
    }

    async get<I extends object = any, O = any>(url: string, payload?: I, auth?: string, headers?: any): Promise<O> {
        const result = await get(url, {
            headers,
            body: payload ? JSON.stringify(payload) : undefined,
            auth
        });
        return this.toJson(result.body);
    }

    // Fix any malformed JSON objects containing concat arrays
    toJson<O>(input: string): O {

        try {
            const result = JSON.parse(input);
            return result as O;

        } catch (err) {

            // Attempt to replace any instances of "]["
            input = input.replace(/\s*/g, "");
            while (input.indexOf("][") > -1) {
                input = input.replace("][", "],[");
            }
            input = `[${input}]`;
            return JSON.parse(input);

        }

    }
}
