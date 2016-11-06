'use strict';

const systemConfig = require('system/system-config');

module.exports = {
    config: Object.assign({}, systemConfig),
    envKeys: [
        "AWS_ACCESS_KEY_ID",
        "AWS_SECRET_ACCESS_KEY",
        "AWS_REGION",
        "AWS_REGION_SES",
        "GOOGLE_RECAPTCHA_SECRET_KEY",
        "NOTIFICATION_FROM_ADDRESS",
        "NOTIFICATION_TO_ADDRESS",
        "PORT",
        "SYSTEM_ENV",
        "SYSTEM_NAMESPACE"
    ],
    namespace: systemConfig.systemNamespace,
    region: systemConfig.awsRegion,
    commands: [
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/tables',
        }
    ]
};
