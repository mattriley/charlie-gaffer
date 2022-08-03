module.exports = ({ window }) => () => {

    return {
        fetch: (...args) => window.fetch(...args)
    };

};
