module.exports = ({ window, react, pureComponents, effects }) => () => {

    const [grecaptcha, setGrecaptcha] = react.useState(false);
    const [errorMessage, setErrorMessage] = react.useState();
    const [status, setStatus] = react.useState();

    react.useEffect(() => {
        const grecaptchaScript = window.document.createElement('script');
        grecaptchaScript.onload = () => { window.grecaptcha.ready(() => setGrecaptcha(window.grecaptcha)); };
        grecaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
        window.document.head.append(grecaptchaScript);
    }, []);

    const handleSubmit = async message => {
        setStatus('loading');
        try {
            await effects.sendMessage(message);
            setStatus('success');
        }
        catch (err) {
            setStatus('error');
            setErrorMessage('Sorry, an unexpected error occurred. Please try again later.');
        }
    };

    if (status === 'success') return <pureComponents.MessageSent />;

    return <div className="contact-me-container">
        <h3 id="contact-me">Contact Me</h3>
        <p className="van">Van Package available</p>
        <pureComponents.ErrorMessage errorMessage={errorMessage} />
        <br />
        <pureComponents.MessageForm
            onSubmit={handleSubmit}
            isLoading={status === 'loading'}
            grecaptcha={grecaptcha}
        />
    </div>;
};
