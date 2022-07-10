const compose = require('./compose');
const { modules } = compose();

module.exports.handler = event => {

    const message = JSON.parse(event.body);
    return modules.contactMe.handleMessage(message);

};
