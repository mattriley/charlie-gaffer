const React = require('react');

module.exports = () => () => {

    const [request, setRequest] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(null);

    const fetchApi = async () => {
        console.log('fetch');
        const { url, ...args } = request;
        const resp = await fetch(url, args);
        console.log(resp);
        // const data = await resp.json();
        const data = await resp.text();
        console.log(data);
        setRequest(null);
        setLoading(false);
        setData(data);
    };

    // React.useEffect(() => {
    //     console.log('####');
    //     if (request) fetchApi();
    // }, []);

    if (request) fetchApi();

    const send = request => setRequest(request);

    return { send, loading, data };

};
