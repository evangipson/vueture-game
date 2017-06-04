// webpack should be in the node_modules directory, install if not.
var webpack = require("webpack");

module.exports = {
    context: __dirname + "/src/ts",
    entry: {
        vueture: __dirname + "/src/ts/main.ts",
    },
    output: {
        path: __dirname + "/dist/js",
        filename: "[name].js"
    },
    resolve: {
        extensions: ['.js', '.vue', '.ts'],
    },
    // vue-loader configuration
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        // Force only 1 output file no matter how big it is
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1, // disable creating additional chunks
        })
    ],
};