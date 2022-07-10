module.exports = ({ config }) => ({ onCaptcha }) => {

    window.setCaptcha = token => onCaptcha(token);

    return <div className="field">
        <div className="g-recaptcha"
            data-sitekey={config.googleRecaptchaSiteKey}
            data-callback="setCaptcha"
        ></div>
    </div>;

};
