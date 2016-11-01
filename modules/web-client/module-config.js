const systemConfig = require('system/system-config');
const moduleConfig = require('./module-config.json');

module.exports = {
    apiUrl: moduleConfig.apiUrl || `https://${systemConfig.systemNamespace30}.herokuapp.com`,
    appDomain: systemConfig.isProduction ? moduleConfig.productionDomain : `${moduleConfig.moduleName}.${systemConfig.testDomain}`,
    hostedZone: systemConfig.isProduction ? `${moduleConfig.productionDomain}.` : `${systemConfig.testDomain}.`
};



