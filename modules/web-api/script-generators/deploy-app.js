const lakitu = require('lakitu');
const systemConfig = require('system/system-config');
lakitu.writeScript([
    `APP_NAME=${systemConfig.systemNamespace30}`,
    'linklocal --unlink',
    'npm install',
    'echo Deploying environment variables',
    `heroku config:push --app $APP_NAME --file .env-${systemConfig.systemEnv} --clean --overwrite`,
    'echo Deploying application',
    'heroku builds:create -a $APP_NAME'
]);


