const React = require('react');
const _ = require('lodash');

module.exports = ({ services, hooks, config }) => () => {

    const [state, setState] = React.useState({
        name: 'Matt',
        email: 'mattrileyaus@gmail.com',
        phone: '0430512239',
        message: 'test only',
        grecaptchaResponse: null
    });

    const [errorMessages, setErrorMessages] = React.useState([]);

    const { send, loading, data, error } = hooks.useApi(() => {
        const errorMessages1 = services.validateMessage(state, {});
        setErrorMessages(errorMessages1);
        return services.sendMessage(state);
    });

    const _fieldChanged = e => {
        setField(e.target.getAttribute('name'), e.target.value);
    };

    const setField = (key, value) => {
        const newState = { ...state, [key]: value };
        setState(newState);
        const errorMessages = services.validateMessage(newState, { field: key });
        setErrorMessages(errorMessages);
    };

    window.setCaptcha = token => setField('grecaptchaResponse', token);

    const getErrorMessages = () => {
        if (error) return ['Sorry, an unexpected error occurred. Please try again later.'];
        return errorMessages;
    };


    if (data) {
        return <div className="message">
            <form>
                <h1 id="contact-me">Contact Me</h1>
                Thanks for your message, I&#39;ll be in touch shortly.
            </form>
        </div>;
    }

    const errorMessagesNodes = getErrorMessages().map((errorMessage, i) => {
        return <div key={i}>{errorMessage}</div>;
    });

    const sendButton = loading ? <span><img src="/images/ajax-loader.gif" /> Sending...</span> :
        <button type="button" onClick={send}>Send</button>;

    const captcha = <div className="field">
        <div className="g-recaptcha"
            data-sitekey={config.googleRecaptchaSiteKey}
            data-callback="setCaptcha"
        ></div>
    </div>;

    return <div className="message">
        <form>
            <h1 id="contact-me">Contact Me</h1>
            <p>Van Package available</p>
            <div id="errorMessage">{errorMessagesNodes}</div>
            <br />
            <div className="field">
                <label>Name</label>
                <input name="name" type="text" value={state.name} onChange={_fieldChanged} />
            </div>
            <div className="field">
                <label>Email</label>
                <input name="email" type="email" value={state.email} onChange={_fieldChanged} />
            </div>
            <div className="field">
                <label>Phone</label>
                <input name="phone" type="tel" value={state.phone} onChange={_fieldChanged} />
            </div>
            <div className="field">
                <label>Message</label>
                <textarea name="message" value={state.message} onChange={_fieldChanged} />
            </div>
            {captcha}
            {sendButton}
        </form>
    </div>;
};
