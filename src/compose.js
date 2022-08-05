const react = require('react');
const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ compositionName, window, configs }) => {

    const options = { compositionName, defaultConfig, configs };
    const { compose, config } = composer(modules, options);
    const { io } = compose('io', { config, window });
    const { effects } = compose('effects', { io, config });
    const { pureComponents } = compose('pureComponents', { config });
    compose('components', { window, react, pureComponents, effects });
    return compose.end();

};
