const fs = require('fs');
const systemConfig = require('system/system-config');
const appConfig = require('./app-config');

const scriptLines = [
    `AWS_PROFILE=${systemConfig.awsDeploymentProfile}`,
    `S3_PATH=s3://${appConfig.appDomain}`,
    'npm run build',
    'aws s3 sync src ${S3_PATH} --profile=${AWS_PROFILE}'
];

fs.writeFile(process.argv[2], scriptLines.join('\n'));