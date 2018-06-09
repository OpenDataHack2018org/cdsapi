import {DataFormat} from "./data.format";

export interface DataOptions extends Record<string, string | string[]> {
    variable: string;
    pressure_level?: string | string[];
    date?: string | string[];
    month: string | string[];
    day?: string | string[];
    time?: string | string[];
    area?: string[] | string;
    format: DataFormat;
}
