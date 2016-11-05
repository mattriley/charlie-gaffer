'use strict';

const systemConfig = require('system/system-config');

module.exports = {
    config: Object.assign({}, systemConfig),
    namespace: systemConfig.systemNamespace,
    region: systemConfig.awsRegion,
    commands: [
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/tables',
        }
    ]
};
