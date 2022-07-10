const React = require('react');

module.exports = () => () => {

    const [request, setRequest] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    const fetchApi = async () => {
        console.log('fetch');
        const { url, ...args } = request;
        try {
            const resp = await fetch(url, args);
            console.log(resp);
            // const data = await resp.json();
            const data = await resp.text();
            console.log({ data });
            setData(data);
            setError(null);
        }
        catch (err) {
            setError(err);
            setData(null);
        }
        finally {
            setRequest(null);
            setLoading(false);
        }
    };

    if (request) fetchApi();

    const send = request => setRequest(request);

    return { send, loading, data };

};
