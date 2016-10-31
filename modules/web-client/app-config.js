const appName = 'webclient';
const prodDomain = 'charliemoukbel.com';

module.exports = {
    appDomain: process.env.IS_PRODUCTION ? prodDomain : [appName, process.env.TEST_DOMAIN].join('.'),
    hostedZone: process.env.IS_PRODUCTION ? `${prodDomain}.` : `${process.env.TEST_DOMAIN}.`
};

// module.exports = {
//     appDomain: process.env.IS_PRODUCTION ? prodDomain : systemConfig.testSubdomain(appName),
//     hostedZone: process.env.IS_PRODUCTION ? `${prodDomain}.` : `${systemConfig.testDomain}.`
// };
