module.exports = ({ io, config }) => async message => {

    const url = `${config.captchaVerifyUrl}?secret=${config.captchaSecretKey}&response=${message.grecaptchaResponse}`;
    const res = await io.fetch(url, { method: 'POST' });
    const data = await res.json();
    console.log('Captcha response:', data);
    if (!data.success) throw new Error('Captcha verification failed.');

};
