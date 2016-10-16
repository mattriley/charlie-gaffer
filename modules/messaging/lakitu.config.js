'use strict';

const systemConfig = require('./system-config');

module.exports = {
    namespace: systemConfig.systemNamespace,
    region: 'ap-southeast-2',
    commands: [
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/tables',
        }
    ]
};
