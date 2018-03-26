const AWS = require('aws-sdk');
const uuid = require('node-uuid');
const fetch = require('node-fetch');
const _saveMessage = require('./save-message');
const _sendEmail = require('./send-email');
const _verifyCaptcha = require('./verify-captcha');
const _lambda = require('./lambda');

const handleMessage = _lambda({
    console,
    saveMessage: _saveMessage({
        now: Date.now,
        uuid: uuid.v4,
        tableName: process.env.MESSAGES_TABLE_NAME,
        dynamoClient: new AWS.DynamoDB.DocumentClient()
    }),
    sendEmail: _sendEmail({
        fromAddress: process.env.NOTIFICATION_FROM_ADDRESS,
        toAddress: process.env.NOTIFICATION_TO_ADDRESS,
        sesClient: new AWS.SES({ region: process.env.AWS_SES_REGION })
    }),
    verifyCaptcha: _verifyCaptcha({
        enabled: process.env.CAPTCHA_ENABLED,
        secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
        fetch
    })
});

module.exports = { handleMessage };