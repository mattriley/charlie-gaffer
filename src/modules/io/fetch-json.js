module.exports = ({ io, constants }) => async (url, options = {}) => {

    const fullOptions = {
        ...options,
        body: {
            ...options.body,
            isSynthetic: constants.isSynthetic
        },
        headers: {
            ...options.headers,
            'content-type': 'application/json'
        }
    };

    const jsonifiedOptions = {
        ...fullOptions,
        body: fullOptions.body ? JSON.stringify(fullOptions.body) : undefined
    };

    const res = await io.fetch(url, jsonifiedOptions);

    if (!res.ok) {
        throw new Error(`Request failed with status ${res.staus}`);
    }

    return res.json();

};
