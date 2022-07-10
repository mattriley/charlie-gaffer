module.exports = ({ contactMe, io }) => async message => {

    const ddbRequest = contactMe.ddbRequest(message);
    const sesRequest = contactMe.sesRequest(message);

    await contactMe.verifyCaptcha(message);
    await io.dynamoClient.put(ddbRequest).promise();
    await io.sesClient.sendEmail(sesRequest).promise();

};
