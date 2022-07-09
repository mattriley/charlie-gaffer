const process = require('process');

module.exports = {
    messagesTableName: process.env.MESSAGES_TABLE_NAME,
    notificationFromAddress: process.env.NOTIFICATION_FROM_EMAIL,
    notificationToAddress: process.env.NOTIFICATION_TO_EMAIL,
    captchaVerifyUrl: process.env.GOOGLE_RECAPTCHA_VERIFY_URL,
    captchaSecretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
};
