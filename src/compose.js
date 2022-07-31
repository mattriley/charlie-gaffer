const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ window, configs } = {}) => {

    const io = { fetch: (...args) => fetch(...args) };
    const { compose, config } = composer({ io, ...modules }, { defaultConfig, configs });
    const { lib } = compose('lib');
    const { effects } = compose('effects', { io, config });
    const { pureComponents } = compose('pureComponents', { config });
    const { hooks } = compose('hooks');
    compose('components', { pureComponents, effects, lib, hooks, window, config });
    return compose.end();

};
