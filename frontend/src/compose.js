const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ window, configs } = {}) => {

    const io = { fetch: (...args) => fetch(...args) };
    const { compose, config } = composer({ io, ...modules }, { defaultConfig, configs });
    const { services } = compose('services', { io, config });
    const { pureComponents } = compose('pureComponents', { config });
    const { hooks } = compose('hooks');
    compose('components', { pureComponents, services, hooks, window, config });
    return compose.end();

};
