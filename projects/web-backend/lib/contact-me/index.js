const _saveMessage = require('./save-message');
const _sendEmail = require('./send-email');
const _verifyCaptcha = require('./verify-captcha');
const _lambda = require('./lambda');

module.exports = ({ dynamoClient, sesClient, fetch, uuid, now, config }) => {
    return _lambda({
        console,
        saveMessage: _saveMessage({
            now,
            uuid,
            tableName: config.messagesTableName,
            dynamoClient
        }),
        sendEmail: _sendEmail({
            fromAddress: config.notificationFromAddress,
            toAddress: config.notificationToAdress,
            sesClient
        }),
        verifyCaptcha: _verifyCaptcha({
            enabled: config.captchaEnabled,
            secret: config.recaptchaSecretKey,
            fetch
        })
    });
};