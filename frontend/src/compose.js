const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ configs } = {}) => {

    const { compose, config } = composer(modules, { defaultConfig, configs });
    const { services } = compose('services');
    const { hooks } = compose('hooks');
    compose('components', { services, hooks, config });
    return compose.end();

};
