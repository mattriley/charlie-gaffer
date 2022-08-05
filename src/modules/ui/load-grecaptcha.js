module.exports = ({ window }) => callback => {

    const grecaptchaScript = window.document.createElement('script');
    grecaptchaScript.onload = () => { window.grecaptcha.ready(() => callback(window.grecaptcha)); };
    grecaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
    window.document.head.append(grecaptchaScript);

};

