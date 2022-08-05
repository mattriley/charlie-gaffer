const react = require('react');
const mixpanel = require('mixpanel-browser');
const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ compositionName, window, configs }) => {

    const options = { compositionName, defaultConfig, configs };
    const { compose, config } = composer(modules, options);

    mixpanel.init(config.mixpanelToken, { debug: config.mixpanelDebug });

    const { io } = compose('io', { config, mixpanel, window });
    const { effects } = compose('effects', { io, config });
    compose('components', { react, effects, config, window });
    return compose.end();

};
