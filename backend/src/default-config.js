const process = require('process');

module.exports = {
    messagesTableName: process.env.MESSAGES_TABLE_NAME,
    notificationFromAddress: process.env.NOTIFICATION_FROM_ADDRESS,
    notificationToAddress: process.env.NOTIFICATION_TO_ADDRESS,
    captchaEnabled: process.env.CAPTCHA_ENABLED,
    recaptchaSecretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY
};
