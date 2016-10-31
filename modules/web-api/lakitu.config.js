'use strict';

module.exports = {
    namespace: process.env.SYSTEM_NAMESPACE,
    region: 'ap-southeast-2',
    commands: [
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/tables',
        }
    ]
};
