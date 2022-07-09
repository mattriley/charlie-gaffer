const compose = require('./compose');

module.exports.handler = (event, context, callback) => {

    const { modules } = compose();
    return modules.contactMe.lambda(event, context, callback);

};
