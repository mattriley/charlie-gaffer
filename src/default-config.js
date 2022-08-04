/* eslint-disable no-undef */

module.exports = {
    portfolio: require('./portfolio.json'),
    stage: process.env.STAGE,
    appName: process.env.DISPLAY_NAME,
    contactUrl: process.env.CONTACT_URL,
    googleRecaptchaSiteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    googleAnalyticsTrackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID
};
