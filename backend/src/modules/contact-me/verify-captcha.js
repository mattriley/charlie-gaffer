module.exports = ({ io, config }) => response => {

    const secret = config.recaptchaSecretKey;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`;
    return io.fetch(url, { method: 'POST' })
        .then(res => res.json())
        .then(res => {
            if (res.success) return;
            throw new Error('Captcha verification failed.');
        });

};
