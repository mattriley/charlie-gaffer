module.exports = ({ io, config }) => async message => {

    const resp = await io.fetch(config.apiUrl, {
        method: 'POST',
        body: JSON.stringify(message)
    });

    if (!resp.ok) {
        console.error(resp);
        throw new Error('Failed to send message');
    }

    return resp;

};
