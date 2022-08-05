/* eslint-disable no-undef */

const isTest = process.env.STAGE !== 'prod';

module.exports = {
    portfolio: require('./portfolio.json'),
    stage: process.env.STAGE,
    appName: process.env.DISPLAY_NAME,
    bffUrl: process.env.BFF_URL,
    googleRecaptchaSiteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    mixpanelToken: process.env.MIXPANEL_TOKEN,
    mixpanelDebug: isTest,
    isTest
};
