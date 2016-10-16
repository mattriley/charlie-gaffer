const lakitu = require('lakitu');
const systemConfig = require('system/system-config');

lakitu.writeScript([
    `APP_NAME=${systemConfig.systemNameSimplified}--${systemConfig.systemEnv}`,
    'linklocal --unlink',
    'npm install',
    'echo Deploying environment variables',
    'heroku config:push --overwrite -a $APP_NAME',
    'echo Deploying application',
    'heroku builds:create -a $APP_NAME'
]);


