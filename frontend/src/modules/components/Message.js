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
        const errorMessages1 = services.validateMessage(message, {});
        setErrorMessages(errorMessages1);
        return services.sendMessage(message);
    });

    const onFieldChanged = e => {
        setField(e.target.getAttribute('name'), e.target.value);
    };

    const setField = (key, value) => {
        const newState = { ...message, [key]: value };
        setMessage(newState);
        const errorMessages = services.validateMessage(newState, { key });
        setErrorMessages(errorMessages);
    };

    const onCaptcha = token => setField('grecaptchaResponse', token);

    const getErrorMessages = () => {
        if (error) return ['Sorry, an unexpected error occurred. Please try again later.'];
        return errorMessages;
    };

    if (data) return <components.MessageSent />;

    const errorMessagesNodes = getErrorMessages().map((errorMessage, i) => {
        return <div key={i}>{errorMessage}</div>;
    });

    const sendButton = loading ?
        <span><img src="/images/ajax-loader.gif" /> Sending...</span> :
        <button type="button" onClick={send}>Send</button>;

    return <div className="message">
        <form>
            <h1 id="contact-me">Contact Me</h1>
            <p>Van Package available</p>
            <div id="errorMessage">{errorMessagesNodes}</div>
            <br />
            <components.MessageForm message={message} onFieldChanged={onFieldChanged} />
            <components.MessageCaptcha onCaptcha={onCaptcha} />
            {sendButton}
        </form>
    </div>;
};
