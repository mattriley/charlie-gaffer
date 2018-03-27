module.exports = ({ secret, fetch, enabled }) => {
    if (!enabled) return () => { };

    return (response) => {
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`;
        return fetch(url, { method: 'POST' })
            .then(res => res.json())
            .then(res => {
                if (res.success) return;
                throw new Error('Captcha verification failed.');
            });
    };
};
