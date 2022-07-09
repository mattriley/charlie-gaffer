module.exports = ({ contactMe, io }) => async event => {

    const message = JSON.parse(event.body);
    const ddbRequest = contactMe.ddbRequest(message);
    const sesRequest = contactMe.sesRequest(message);

    await contactMe.verifyCaptcha(message);
    await io.dynamoClient.putAsync(ddbRequest).promise();
    await io.sesClient.sendEmail(sesRequest).promise();

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };

};
