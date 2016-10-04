const lakitu = require('lakitu');
const systemConfig = require('system/system-config');

lakitu.writeScript([
    `export AWS_PROFILE=${systemConfig.awsDeploymentProfile}`,
    'node ./node_modules/lakitu/bin/lakitu'
]);