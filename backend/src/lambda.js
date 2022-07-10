const compose = require('./compose');
const { modules } = compose();

module.exports.handler = async event => {

    const message = JSON.parse(event.body);
    await modules.contactMe.handleMessage(message);
    return { statusCode: 201 };

};
