const AWS = require('aws-sdk');
const uuid = require('node-uuid');
const fetch = require('node-fetch');
const _saveMessage = require('./save-message');
const _sendEmail = require('./send-email');
const _verifyCaptcha = require('./verify-captcha');
const _handleMessageEvent = require('./handle-message-event');

const handleMessage = _handleMessageEvent.bind({
    console,
    saveMessage: _saveMessage.bind({
        now: Date.now,
        uuid: uuid.v4,
        tableName: process.env.MESSAGES_TABLE_NAME,
        dynamoClient: new AWS.DynamoDB.DocumentClient()
    }),
    sendEmail: _sendEmail.bind({
        fromAddress: process.env.NOTIFICATION_FROM_ADDRESS,
        toAddress: process.env.NOTIFICATION_TO_ADDRESS,
        sesClient: new AWS.SES({ region: process.env.AWS_SES_REGION })
    }),
    verifyCaptcha: _verifyCaptcha.bind({
        enabled: process.env.CAPTCHA_ENABLED,
        secret: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
        fetch
    })
});

module.exports = { handleMessage };