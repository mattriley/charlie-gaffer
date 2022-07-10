const React = require('react');

module.exports = ({ components, services, hooks }) => () => {

    const [message, setMessage] = React.useState({
        name: 'Matt',
        email: 'mattrileyaus@gmail.com',
        phone: '0430512239',
        message: 'test only',
        grecaptchaResponse: null
    });

    const [errorMessages, setErrorMessages] = React.useState([]);

    const { send, loading, data, error } = hooks.useApi(() => {
        const errorMessages = services.validateMessage(message, {});
        setErrorMessages(errorMessages);
        if (errorMessages.length) return;
        return services.sendMessage(message);
    });

    if (error && !errorMessages.length) {
        setErrorMessages(['Sorry, an unexpected error occurred. Please try again later.']);
    }

    const onCaptcha = token => setField('grecaptchaResponse', token);
    const onFieldChanged = e => setField(e.target.getAttribute('name'), e.target.value);
    const setField = (key, value) => {
        const newMessage = { ...message, [key]: value };
        const errorMessages = services.validateMessage(newMessage, { key });
        setMessage(newMessage);
        setErrorMessages(errorMessages);
    };

    if (data) return <components.MessageSent />;

    const sendButton = loading ?
        <span><img src="/images/ajax-loader.gif" /> Sending...</span> :
        <button type="button" onClick={send}>Send</button>;

    return <div className="message">
        <form>
            <h1 id="contact-me">Contact Me</h1>
            <p>Van Package available</p>
            <components.ErrorMessages errorMessages={errorMessages} />
            <br />
            <components.MessageForm message={message} onFieldChanged={onFieldChanged} />
            <components.MessageCaptcha onCaptcha={onCaptcha} />
            {sendButton}
        </form>
    </div>;
};
