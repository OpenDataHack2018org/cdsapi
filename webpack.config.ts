import {resolve as resolvePath} from "path";
export default {
    name: "standalone",
    entry: resolvePath(__dirname, "index.ts"),
    output: {
        path: __dirname,
        filename: "cdsapi-standalone.js",
        library: "cdsapi",
        libraryTarget: "var"
    },
    // Turn on sourcemaps=
    devtool: "source-map",
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".js"]
    },
    // Add minification
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: "pre",
                loader: "tslint-loader",
                options: {
                    failOnHint: true
                }
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },
    node: {
        fs: "empty",
        module: false
    }
};
