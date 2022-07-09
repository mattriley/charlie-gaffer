const compose = require('./compose');

module.exports.handler = event => {

    const { modules } = compose();
    return modules.contactMe.handleEvent(event);

};
