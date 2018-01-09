const Promise = require('bluebird');

module.exports = function (message) {
    const { tableName, uuid, dynamoClient, getISODateString } = this;

    const meta = {
        id: uuid.v4(),
        createdOn: getISODateString()
    };

    const params = {
        Item: Object.assign({}, meta, message),
        TableName: tableName
    };

    const put = Promise.promisify(dynamoClient.put);
    return put(params);
};