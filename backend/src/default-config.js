const process = require('process');

module.exports = {
    stage: process.env.STAGE,
    primaryContactEmail: process.env.PRIMARY_CONTACT_EMAIL,
    technicalContactEmail: process.env.TECHNICAL_CONTACT_EMAIL,
    noreplyEmail: process.env.NOREPLY_EMAIL,
    captchaVerifyUrl: process.env.GOOGLE_RECAPTCHA_VERIFY_URL,
    captchaSecretKey: process.env.GOOGLE_RECAPTCHA_SECRET_KEY,
    messagesTableName: `${process.env.MESSAGES_TABLE_NAME}-${process.env.STAGE}`
};
