const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ configs } = {}) => {

    const { compose, config } = composer(modules, { defaultConfig, configs });
    compose('components', { config });
    return compose.end();

};
