module.exports = ({ window, react, pureComponents, effects }) => () => {

    const [grecaptcha, setGrecaptcha] = react.useState(false);
    const [errorMessage, setErrorMessage] = react.useState();
    let [status, setStatus] = react.useState();

    react.useEffect(() => {
        const grecaptchaScript = window.document.createElement('script');
        grecaptchaScript.onload = () => { window.grecaptcha.ready(() => setGrecaptcha(window.grecaptcha)); };
        grecaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
        window.document.head.append(grecaptchaScript);
    }, []);

    const handleSubmit = async message => {
        try {
            setStatus('loading');
            await effects.sendMessage(message);
            setStatus('success');
        }
        catch (err) {
            setStatus('error');
            setErrorMessage('Sorry, an unexpected error occurred. Please try again later.');
        }
    };

    const form = <div>
        <p>Van Package available</p>
        <p className="errorMessage">{errorMessage}</p>
        <pureComponents.MessageForm
            onSubmit={handleSubmit}
            isLoading={status === 'loading'}
            grecaptcha={grecaptcha}
        />
    </div>;

    status = 'success';

    const done = <div className="done">Thanks! I&#39;ll be in touch shortly.</div>;

    return <div id="contact-me">
        <h3>Contact Me</h3>
        {status === 'success' ? done : form}
    </div>;
};
