const AWS = require('aws-sdk');
const crypto = require('crypto');

module.exports = ({ config }) => () => {

    return {
        fetch: (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)),
        uuid: crypto.randomUUID,
        now: Date.now,
        dynamoClient: new AWS.DynamoDB.DocumentClient(),
        sesClient: new AWS.SES({ region: config.awsSesRegion }),
    };

};
