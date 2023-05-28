const react = require('react');
const mixpanel = require('mixpanel-browser');
const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ window, config }) => {

    const { configure } = composer(modules);
    const { compose, constants } = configure(defaultConfig, config, c => {
        const isTest = c.stage !== 'prod';
        return { isTest };
    });

    mixpanel.init(constants.mixpanelToken, { debug: constants.mixpanelDebug ?? constants.isTest });

    const { io } = compose('io', { mixpanel, window });
    const { ui } = compose('ui', { window });
    const { effects } = compose('effects', { io });
    compose('components', { react, ui, effects });

    return compose.end();

};
