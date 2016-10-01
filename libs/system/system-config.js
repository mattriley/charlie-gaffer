const prodEnvName = 'prod';
const systemName = 'charlie-moukbel';
const systemNameSimplified = systemName.replace(/\W/g, '');
const systemEnvVarPrefix = systemNameSimplified.toUpperCase();
const systemEnv = process.env[`${systemEnvVarPrefix}_ENV`] || `dev-${process.env.USER}`;
const testDomain = 'matthewriley.xyz';

module.exports = {
    awsDeploymentProfile: `${systemNameSimplified}-deploy`,
    isProd: systemEnv === prodEnvName,
    prodEnvName,
    systemEnv,
    systemName,
    systemNameSimplified,
    testDomain,
    testSubdomain: (appName) => [appName, systemEnv, systemNameSimplified, testDomain].join('.')
};