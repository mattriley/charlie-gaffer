module.exports = ({ constants }) => ({ onSubmit, isLoading, grecaptcha }) => {

    const handleSubmit = e => {
        e.preventDefault();
        const formEntries = new FormData(e.currentTarget).entries();
        const formData = Object.fromEntries(formEntries);
        const grecaptchaResponse = formData['g-recaptcha-response'];
        delete formData['g-recaptcha-response'];
        onSubmit({ ...formData, grecaptchaResponse });
    };

    const spinner = <img src="loading.gif" />;
    const sendButton = <button type="submit">Send</button>;

    return <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" required />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
        </div>
        <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" />
        </div>
        <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required />
        </div>
        <div>
            <div className="g-recaptcha" data-sitekey={constants.googleRecaptchaSiteKey}></div>
        </div>
        {isLoading ? spinner : (grecaptcha ? sendButton : null)}
    </form>;

};
