const React = require('react');
const initialState = { name: '', email: '', phone: '', message: '', grecaptchaResponse: null };

module.exports = ({ pureComponents, effects }) => () => {

    const [message, setMessage] = React.useState(initialState);
    const [grecaptcha, setGrecaptcha] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState();
    const [status, setStatus] = React.useState();

    React.useEffect(() => {
        const grecaptchaScript = document.createElement('script');
        grecaptchaScript.onload = () => {
            window.grecaptcha.ready(() => setGrecaptcha(window.grecaptcha));
        };
        grecaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
        document.head.append(grecaptchaScript);
    }, []);

    const handleSubmit = async message => {
        setMessage(message);
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
            message={message}
            onSubmit={handleSubmit}
            isLoading={status === 'loading'}
            grecaptcha={grecaptcha}
        />
    </div>;
};
