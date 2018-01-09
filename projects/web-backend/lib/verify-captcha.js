module.exports = function ({ response }) {
    const { secret, fetch } = this;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`;
    return fetch(url, { method: 'POST' }).then(res => res.json());
};