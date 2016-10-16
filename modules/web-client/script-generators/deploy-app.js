const lakitu = require('lakitu');
const systemConfig = require('system/system-config');
const appConfig = require('../app-config');

lakitu.writeScript([
    `AWS_PROFILE=${systemConfig.awsDeploymentProfile}`,
    `S3_PATH=s3://${appConfig.appDomain}`,
    'npm run build',
    'aws s3 sync src ${S3_PATH} --profile=${AWS_PROFILE}'
]);