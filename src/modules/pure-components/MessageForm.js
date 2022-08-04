module.exports = ({ config }) => ({ message, onSubmit, isLoading, grecaptcha }) => {

    const handleSubmit = e => {
        e.preventDefault();
        const formEntries = new FormData(e.currentTarget).entries();
        const formData = Object.fromEntries(formEntries);
        const grecaptchaResponse = formData['g-recaptcha-response'];
        delete formData['g-recaptcha-response'];
        onSubmit({ ...formData, grecaptchaResponse });
    };

    const spinner = <span><img src="/images/ajax-loader.gif" /> Sending...</span>;
    const sendButton = <button type="submit">Send</button>;

    return <form onSubmit={handleSubmit}>
        <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required defaultValue={message.name} />
        </div>
        <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required defaultValue={message.email} />
        </div>
        <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" defaultValue={message.phone} />
        </div>
        <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required defaultValue={message.message} />
        </div>
        <div className="field">
            <div className="g-recaptcha" data-sitekey={config.googleRecaptchaSiteKey}></div>
        </div>
        {isLoading ? spinner : (grecaptcha ? sendButton : null)}
    </form>;

};
