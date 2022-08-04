module.exports = ({ io, config }) => message => {

    const url = `${config.contactUrl}/messages`;
    return io.fetchJson(url, { method: 'POST', body: message });

};
