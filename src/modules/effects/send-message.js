module.exports = ({ io, config }) => async message => {

    const resp = await io.fetch(config.contactUrl, {
        method: 'POST',
        body: JSON.stringify(message)
    });

    if (!resp.ok) {
        console.error(resp);
        throw new Error('Failed to send message');
    }

    return resp;

};
