'use strict';

const systemConfig = require('./system-config');

const bucketName = `${systemConfig.systemNameSimplified}-code`;

module.exports = {
    region: 'ap-southeast-2',
    namespace: `${systemConfig.systemNameSimplified}--${systemConfig.systemEnv}`,
    commands: [
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/system',
            template: {
                "Outputs": {
                    "CodeBucket": {
                        "Value": bucketName
                    }
                }
            }
        }
    ]
};
