'use strict';

const systemConfig = require('system/system-config');

module.exports = {
    namespace: systemConfig.systemNamespace,
    region: systemConfig.awsRegion,
    commands: [
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/tables',
        }
    ]
};
