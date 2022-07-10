/* eslint-disable no-undef */

module.exports = {
    portfolio: require('./portfolio'),
    app: {
        name: process.env.PROJECT_NAME
    },
    stage: process.env.STAGE,
    apiUrl: process.env.CONTACT_URL,
    googleRecaptchaSiteKey: process.env.GOOGLE_RECAPTCHA_SITE_KEY,
    googleAnalyticsTrackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID
};
