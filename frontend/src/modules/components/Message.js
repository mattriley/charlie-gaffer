const React = require('react');
const _ = require('lodash');

module.exports = ({ services, hooks, config }) => () => {

    const [state, setState] = React.useState({
        name: 'Matt',
        email: 'mattrileyaus@gmail.com',
        phone: '0430512239',
        message: 'test only',
        grecaptchaResponse: null,
        errorMessages: []
    });

    console.log(state);

    const { send, loading, data } = hooks.useApi();

    const _fieldChanged = e => {
        const fieldName = e.target.getAttribute('name');
        const newState = { ...state, [fieldName]: e.target.value };
        const errorMessages = services.validateMessage(newState, { field: fieldName });
        setState({ ...newState, errorMessages });
    };

    const _sendMessage = () => {
        console.log(1);
        return setState(state => {
            const newState = { ...state, grecaptchaResponse: grecaptcha.getResponse() };
            const errorMessages = services.validateMessage(newState, {});
            const isValid = errorMessages.length === 0;
            let status = isValid ? 'sending' : undefined;
            if (!isValid) return;
            const data = _.pick(newState, ['name', 'email', 'phone', 'message', 'grecaptchaResponse']);
            console.log(2);
            send({
                url: `${config.apiUrl}/contact-me`,
                method: 'POST',
                data: JSON.stringify(data)
            });
            return { ...newState, status, errorMessages };

            // try {
            //     await _postMessage(newState);
            // } catch (err) {
            //     return {
            //         ...state,
            //         status: 'error',
            //         errorMessages: ['Sorry, an unexpected error occurred. Please try again later.']
            //     };
            // }
        });
    };

    if (data) {
        return <div className="message">
            <form>
                <h1 id="contact-me">Contact Me</h1>
                Thanks for your message, I'll be in touch shortly.
            </form>
        </div>;
    }

    const errorMessages = state.errorMessages.map((errorMessage, i) => {
        return <div key={i}>{errorMessage}</div>;
    });

    const sendButton = loading ? <span><img src="/images/ajax-loader.gif" /> Sending...</span> :
        <button type="button" onClick={_sendMessage}>Send</button>;

    const captcha = <div className="field">
        <div className="g-recaptcha" data-sitekey={config.googleRecaptchaSiteKey}></div>
    </div>;

    return <div className="message">
        <form>
            <h1 id="contact-me">Contact Me</h1>
            <p>Van Package available</p>
            <div id="errorMessage">{errorMessages}</div>
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
