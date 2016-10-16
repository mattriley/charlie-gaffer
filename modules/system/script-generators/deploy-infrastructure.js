const lakitu = require('lakitu');
const systemConfig = require('../system-config');

lakitu.writeScript([
    `export AWS_PROFILE=${systemConfig.awsDeploymentProfile}`,
    'npm run lakitu'
]);