const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ compositionName, window, configs }) => {

    const options = { compositionName, defaultConfig, configs };
    const { compose, config } = composer(modules, options);
    const { lib } = compose('lib');
    const { io } = compose('io', { window });
    const { effects } = compose('effects', { io, config });
    const { pureComponents } = compose('pureComponents', { config });
    const { hooks } = compose('hooks');
    compose('components', { pureComponents, effects, lib, hooks, window, config });
    return compose.end();

};
