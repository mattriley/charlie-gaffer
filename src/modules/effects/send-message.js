module.exports = ({ io, constants }) => message => {

    const url = `${constants.bffUrl}/messages`;
    return io.fetchJson(url, { method: 'POST', body: message });

};
