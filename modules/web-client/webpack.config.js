const webpack = require('webpack');
const path = require('path');

const apiUrl = process.env.API_URL || `https://${process.env.SYSTEM_NAMESPACE_30}.herokuapp.com`;

module.exports = {
    entry: {
        app: ['./app/main.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'src'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'API_URL': JSON.stringify(apiUrl)
            }
        })
    ]
};