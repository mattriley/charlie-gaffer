const AWS = require('aws-sdk');
const uuid = require('node-uuid');
const fetch = require('node-fetch');
const _saveMessage = require('./lib/save-message');
const _sendEmail = require('./lib/send-email');
const _verifyCaptcha = require('./lib/verify-captcha');
const _sendMessage = require('./lib/send-message');

const send = _sendMessage.bind({
    console,
    saveMessage: _saveMessage.bind({
        tableName: process.env.MESSAGES_TABLE_NAME,
        uuid,
        dynamoClient: new AWS.DynamoDB.DocumentClient()
    }),
    sendEmail: _sendEmail.bind({
        fromAddress: process.env.NOTIFICATION_FROM_ADDRESS,
        toAddress: process.env.NOTIFICATION_TO_ADDRESS,
        sesClient: new AWS.SES({ region: process.env.AWS_SES_REGION })
    }),
    verifyCaptcha: _verifyCaptcha.bind({
        secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
        fetch
    })
});

module.exports = { send };