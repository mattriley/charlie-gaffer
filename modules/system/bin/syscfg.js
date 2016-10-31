#!/usr/bin/env node

const Promise = require('bluebird');

const config = require('../syscfg.json');

const systemName = config.systemName;
const systemNameSimplified = systemName.replace(/\W/g, '');
const systemEnv = process.env['SYSTEM_ENV'] || process.env['USER'];
const testDomain = config.testDomain;
const systemNamespace = `${systemNameSimplified}--${systemEnv}`;
const systemNamespace30 = systemNamespace.length <= 30 ? systemNamespace : `${systemNameSimplified.substr(0, 20)}--${systemEnv}`.substr(0, 30);

const env = {
    AWS_DEPLOYMENT_PROFILE: `${systemNameSimplified}-deploy`,
    IS_PRODUCTION: systemEnv === 'production',
    SYSTEM_ENV: systemEnv,
    SYSTEM_NAME: systemName,
    SYSTEM_NAMESPACE: systemNamespace,
    SYSTEM_NAMESPACE_30: systemNamespace30,
    SYSTEM_NAME_SIMPLIFIED: systemNameSimplified,
    TEST_DOMAIN: [systemEnv, systemNameSimplified, testDomain].join('.')
};

const fs = Promise.promisifyAll(require('fs'));
fs.readFileAsync('.env-' + systemEnv).then(data => {
    const output = Object.keys(env).map(k => `${k}=${env[k]}`).join("\n");
    fs.writeFileAsync('.env', data.toString() + "\n" + output)
}, () => {
    const output = Object.keys(env).map(k => `${k}=${env[k]}`).join("\n");
    fs.writeFileAsync('.env', output)
}).then(() => {
    const output = Object.keys(env).map(k => `export ${k}=${env[k]}`).join("\n");
    console.log(output);
});



