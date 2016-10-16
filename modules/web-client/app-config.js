const systemConfig = require('system/system-config');

const appName = 'webclient';
const prodDomain = 'charliemoukbel.com';

module.exports = {
    appDomain: systemConfig.isProd ? prodDomain : systemConfig.testSubdomain(appName),
    hostedZone: systemConfig.isProd ? `${prodDomain}.` : `${systemConfig.testDomain}.`
};
