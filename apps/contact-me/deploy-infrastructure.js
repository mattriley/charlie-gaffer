const fs = require('fs');
const systemConfig = require('system/system-config');

const scriptLines = [
    `export AWS_PROFILE=${systemConfig.awsDeploymentProfile}`,
    'npm run lakitu'
];

fs.writeFile(process.argv[2], scriptLines.join('\n'));