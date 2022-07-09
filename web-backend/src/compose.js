const modules = require('./modules');
const composer = require('module-composer');
const defaultConfig = require('./default-config.js');

module.exports = ({ configs, overrides } = {}) => {

    const { compose, config } = composer(modules, { defaultConfig, configs, overrides });
    const { io } = compose('io', { config });
    compose('contactMe', { io, config });
    return compose.end();

};
