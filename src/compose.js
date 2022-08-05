const react = require('react');
const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ compositionName, window, configs }) => {

    const options = { compositionName, defaultConfig, configs };
    const { compose, config } = composer({ ...modules, react }, options);
    const { lib } = compose('lib');
    const { io } = compose('io', { config, window });
    const { effects } = compose('effects', { io, config });
    const { pureComponents } = compose('pureComponents', { config });
    compose('components', { react, pureComponents, effects, lib, window, config });
    return compose.end();

};
