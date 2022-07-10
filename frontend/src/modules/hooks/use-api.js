const React = require('react');

module.exports = () => callback => {

    const [request, setRequest] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);

    const invokeCallback = async () => {
        try {
            setLoading(true);
            const data = await callback();
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

    if (request) invokeCallback();

    const send = request => setRequest(request);

    return { send, loading, data, error };

};
