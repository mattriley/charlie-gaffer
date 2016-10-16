'use strict';

const lakitu = require('lakitu');
const systemConfig = require('system/system-config');

module.exports = {
    namespace: `${systemConfig.systemNameSimplified}--${systemConfig.systemEnv}`,
    region: 'ap-southeast-2',
    commands: [
        {
            type: 'aws-lambda-upload-code',
            bucket: lakitu.getOutput('system', 'CodeBucketName'),
            path: __dirname
        },
        {
            type: 'aws-cloud-formation',
            templateDir: 'lakitu/contact-me',
            template: {
                Parameters: {
                    "CodeS3Bucket": {
                        "Type": "String",
                        "Default": lakitu.getOutput('system', 'CodeBucketName')
                    },
                    "CodeS3Key": {
                        "Type": "String"
                    }
                }
            }
        }
    ]
};