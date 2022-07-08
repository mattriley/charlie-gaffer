const AWS = require('aws-sdk');
const uuid = require('node-uuid').v4;
const fetch = require('node-fetch');

const modules = require('./modules');
const composer = require('module-composer');
const defaultConfig = require('./default-config.js');

module.exports = ({ configs } = {}) => {

    const { compose, config } = composer(modules, { defaultConfig, configs });

    const io = {
        fetch,
        uuid,
        now: Date.now,
        dynamoClient: new AWS.DynamoDB.DocumentClient(),
        sesClient: new AWS.SES({ region: config.awsSesRegion }),
    };

    compose('contactMe', { io, config });
    return compose.end();

};
