#!/usr/bin/env node

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const _ = require('lodash');
const dotenv = require('dotenv');

const envFile = `.env-${process.env.SYSTEM_ENV}`;
const envFileExists = fs.existsSync(envFile);

const envKeysFile = path.resolve(process.cwd(), 'env-keys.json');
const envKeysFileExists = fs.existsSync(envKeysFile);

if(envFileExists && !envKeysFileExists) {
    throw new Error('Missing env-keys.json');
}

const configPromise = envFileExists ?
    fs.readFileAsync(envFile).then(data => Object.assign({}, process.env, dotenv.parse(data))) :
    Promise.resolve(process.env);

configPromise.then(config => {
    const envKeys = require(envKeysFile);
    const selectedConfig = _.pick(config, envKeys);
    const data = Object.keys(selectedConfig).map(k => `${k}=${selectedConfig[k]}`).join("\n");
    return fs.writeFileAsync('.env', data)
});
