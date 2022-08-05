module.exports = ({ react, ui, components, effects }) => () => {

    const [grecaptcha, setGrecaptcha] = react.useState(false);
    const [errorMessage, setErrorMessage] = react.useState();
    const [status, setStatus] = react.useState();

    react.useEffect(() => {
        ui.loadGrecaptcha(setGrecaptcha);
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
        <p>Van package available</p>
        <p id="error-message">{errorMessage}</p>
        <components.MessageForm
            onSubmit={handleSubmit}
            isLoading={status === 'loading'}
            grecaptcha={grecaptcha}
        />
    </div>;

    const done = <div id="message-sent">Thanks! I&#39;ll be in touch shortly.</div>;

    return <>
        <h3>Contact Me</h3>
        {status === 'success' ? done : form}
    </>;
};
