module.exports = ({ contactMe }) => async event => {

    const message = JSON.parse(event.body);
    await contactMe.verifyCaptcha(message.grecaptchaResponse);
    await contactMe.saveMessage(message);
    await contactMe.sendEmail(message);

    return {
        statusCode: 201,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    };

};
