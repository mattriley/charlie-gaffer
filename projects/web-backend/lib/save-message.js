const Promise = require('bluebird');

module.exports = message => {
    const { tableName, uuid, dynamoClient } = this;

    const meta = {
        id: uuid.v4(),
        createdOn: new Date().toISOString()
    };

    const params = {
        Item: Object.assign({}, meta, message),
        TableName: tableName
    };

    const put = Promise.promisify(dynamoClient.put);
    return put(params);
};