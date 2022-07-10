module.exports = ({ contactMe, io }) => async message => {

    const isTest = contactMe.isTest(message);
    const ddbRequest = contactMe.ddbRequest({ message, isTest });
    const sesRequest = contactMe.sesRequest({ message, isTest });

    await contactMe.verifyCaptcha(message);
    await io.dynamoClient.put(ddbRequest).promise();
    await io.sesClient.sendEmail(sesRequest).promise();

};
