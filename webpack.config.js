const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
// process.env.NODE_ENV = "development";
/**
 * @type { import("webpack").Configuration }
 */
module.exports = {
    devtool: process.env.NODE_ENV === "development" ? "source-map" : undefined,
    entry: {
        "index": path.join(__dirname, "./src/index.ts"),
    },
    output: {
        path: path.join(__dirname, "./lib"),
        filename: "[name].js",
        library: {
            type: "umd",
            name: "AkabaToolEnvBrowser",
        },
        environment: {
            arrowFunction: false,
            // The environment supports BigInt as literal (123n).
            bigIntLiteral: false,
            // The environment supports const and let for variable declarations.
            const: false,
            // The environment supports destructuring ('{ a, b } = obj').
            destructuring: false,
            // The environment supports an async import() function to import EcmaScript modules.
            dynamicImport: false,
            // The environment supports 'for of' iteration ('for (const x of array) { ... }').
            forOf: false,
            // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
            module: false,
        },
        globalObject: "this"
    },
    optimization: {
        minimize: process.env.NODE_ENV !== "development",
        minimizer: [
            new TerserPlugin({
                extractComments: false
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.m?tsx?/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                    {
                        loader: "ts-loader",
                    },
                ],
            },
        ],
    },
    target: "node",
    resolve: {
        extensions: [".ts", ".es6", ".js"],
        alias: {
            "@": path.join(__dirname, "./src"),
        },
    },
    externals: {
        "akaba-tool": "akaba-tool",
    },
};
