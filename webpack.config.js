var path = require("path");

module.exports = {
    entry: {
        app: ['./app/main.jsx']
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/assets/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },

        ]
    },
    // resolve: {
    //     extensions: ['', '.js', '.jsx', '.json']
    // }
};