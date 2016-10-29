const lakitu = require('lakitu');
const systemConfig = require('system/system-config');
lakitu.writeScript([
    `heroku local --env .env-${systemConfig.systemEnv}`,
]);


