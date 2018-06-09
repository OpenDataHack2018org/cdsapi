import {DataFormat} from "./data.format";

export interface DataOptions extends Record<string, string> {
    variable: string;
    pressure_level?: string;
    date?: string;
    time?: string;
    format: DataFormat;
}
