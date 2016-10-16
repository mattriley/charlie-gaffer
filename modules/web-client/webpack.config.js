const path = require('path');
const systemConfig = require('system/system-config');

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
    loader: {
        appSettings: {
            env: systemConfig.systemEnv
        }
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};