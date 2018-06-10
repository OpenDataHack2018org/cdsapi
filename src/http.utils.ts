// import {GotJSONOptions, post, get} from "got";
import axios from "axios";
export class HttpUtils {

    toAuthParam(auth: string): {username: string, password: string } {

        if (!auth) {
            return undefined;
        }

        const authParts = auth.split(":");
        return {
            username: authParts[0],
            password: authParts[1]
        };
    }

    async post<I extends object = any, O = any>(url: string, payload?: I, auth?: string, headers?: any): Promise<O> {
        const authParam = this.toAuthParam(auth);
        const result = await axios({
            method: "post",
            url,
            data: payload,
            headers,
            transformResponse: [response => this.toJson(response)],
            auth: authParam
        });
        return result.data;
    }

    async get<I extends object = any, O = any>(url: string, payload?: I, auth?: string, headers?: any): Promise<O> {
        const authParam = this.toAuthParam(auth);
        const result = await axios.get(url, {
            headers,
            transformResponse: [response => this.toJson(response)],
            auth: authParam
        });
        return result.data;
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
