const fs = require('fs');
const systemConfig = require('./system-config');

const scriptLines = [
    `export AWS_PROFILE=${systemConfig.awsDeploymentProfile}`,
    'node ./node_modules/lakitu/bin/lakitu'
];

fs.writeFile(process.argv[2], scriptLines.join('\n'));