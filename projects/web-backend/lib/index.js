const AWS = require('aws-sdk');
const uuid = require('node-uuid');
const fetch = require('node-fetch');
const composeContactMe = require('./contact-me');

const contactMe = composeContactMe({
    dynamoClient: new AWS.DynamoDB.DocumentClient(),
    sesClient: new AWS.SES({ region: process.env.AWS_SES_REGION }),
    fetch,
    uuid: uuid.v4,
    now: Date.now,
    config: {
        messagesTableName: process.env.MESSAGES_TABLE_NAME,
        notificationFromAddress: process.env.NOTIFICATION_FROM_ADDRESS,
        notificationToAddress: process.env.NOTIFICATION_TO_ADDRESS,
        captchaEnabled: process.env.CAPTCHA_ENABLED,
        recaptchaSecretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY
    }
});

module.exports = { contactMe };