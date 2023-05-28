module.exports = ({ mixpanel, constants }) => async (event, properties = {}) => {

    const { isTest, isSynthetic } = constants;
    return mixpanel.track(event, { ...properties, isTest, isSynthetic });

};
