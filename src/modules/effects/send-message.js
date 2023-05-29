module.exports = ({ io, config }) => message => {

    const url = `${config.bffUrl}/messages`;
    return io.fetchJson(url, { method: 'POST', body: message });

};
