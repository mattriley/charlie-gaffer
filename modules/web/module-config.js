const systemConfig = require('system/system-config');
const moduleConfig = require('./module-config.json');

module.exports = {
    apiUrl: moduleConfig.apiUrl || `https://${systemConfig.systemNamespace30}.herokuapp.com`,
    appDomain: systemConfig.isProduction ? moduleConfig.productionDomain : `${systemConfig.systemEnv}.${moduleConfig.testDomain}`,
    hostedZone: systemConfig.isProduction ? `${moduleConfig.productionDomain}.` : systemConfig.testDomainHostedZone,
    googleRecaptchaSiteKey: moduleConfig.googleRecaptchaSiteKey,
    googleAnalyticsTrackingId: moduleConfig.googleAnalyticsTrackingId
};



