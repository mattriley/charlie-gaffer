const prodEnvName = 'prod';
const systemName = 'charlie-moukbel';
const systemNameSimplified = systemName.replace(/\W/g, '');
const systemEnv = process.env['SYSTEM_ENV'];
const testDomain = 'matthewriley.xyz';
const systemNamespace = `${systemNameSimplified}--${systemEnv}`;
const systemNamespace30 = systemNamespace.length <= 30 ? systemNamespace : `${systemNameSimplified.substr(0, 20)}--${systemEnv}`.substr(0, 30);

module.exports = {
    awsDeploymentProfile: `${systemNameSimplified}-deploy`,
    isProd: systemEnv === prodEnvName,
    prodEnvName,
    systemEnv,
    systemName,
    systemNamespace,
    systemNamespace30,
    systemNameSimplified,
    testDomain,
    testSubdomain: (appName) => [appName, systemEnv, systemNameSimplified, testDomain].join('.')
};