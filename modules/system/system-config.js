#!/usr/bin/env node

const config = require('./system-config.json');
const systemName = config.systemName;
const systemNameSimplified = systemName.replace(/\W/g, '');
const systemEnv = process.env['SYSTEM_ENV'] || process.env['USER'];
const testDomain = config.testDomain;
const systemNamespace = `${systemNameSimplified}--${systemEnv}`;
const systemNamespace30 = systemNamespace.length <= 30 ? systemNamespace : `${systemNameSimplified.substr(0, 20)}--${systemEnv}`.substr(0, 30);

module.exports = Object.assign({}, config, {
    awsDeploymentProfile: `${systemNameSimplified}-deploy`,
    isProduction: systemEnv === 'production',
    systemEnv,
    systemName,
    systemNamespace,
    systemNamespace30,
    systemNameSimplified,
    testDomain: [systemEnv, systemNameSimplified, testDomain].join('.'),
    testDomainHostedZone: `${testDomain}.`
});