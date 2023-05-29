module.exports = ({ mixpanel, config }) => async (event, properties = {}) => {

    const { isTest, isSynthetic } = config;
    return mixpanel.track(event, { ...properties, isTest, isSynthetic });

};
