module.exports = ({ io, config }) => async message => {

    const url = `${config.captchaVerifyUrl}?secret=${config.recaptchaSecretKey}&response=${message.grecaptchaResponse}`;
    const res = await io.fetch(url, { method: 'POST' });
    const { success } = await res.json();
    if (!success) throw new Error('Captcha verification failed.');

};
