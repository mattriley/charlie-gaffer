const webpack = require('webpack');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

module.exports = {
    devServer: {
        contentBase: srcDir,
        compress: true,
        port: 9000,
        hot: true
    },
    entry: {
        app: ['./lib/main.jsx']
    },
    output: {
        path: srcDir,
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                API_URL: JSON.stringify(process.env.API_URL),
                GOOGLE_RECAPTCHA_SITE_KEY: JSON.stringify(process.env.GOOGLE_RECAPTCHA_SITE_KEY),
                GOOGLE_ANALYTICS_TRACKING_ID: JSON.stringify(process.env.GOOGLE_ANALYTICS_TRACKING_ID)
            }
        })
    ]
};