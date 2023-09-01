const react = require('react');
const mixpanel = require('mixpanel-browser');
const composer = require('module-composer');
const modules = require('./modules');
const defaultConfig = require('./default-config');

module.exports = ({ window, config }) => {

    const { configure } = composer(modules);

    const { compose } = configure([defaultConfig, config, c => {
        const isTest = c.stage !== 'prod';
        mixpanel.init(c.mixpanelToken, { debug: c.mixpanelDebug ?? isTest });
        return { isTest };
    }]);

    const { io } = compose('io', { mixpanel, window });
    const { ui } = compose('ui', { window });
    const { effects } = compose('effects', { io });
    return compose('components', { react, ui, effects });

};
