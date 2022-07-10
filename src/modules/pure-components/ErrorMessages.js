module.exports = () => ({ errorMessages }) => {

    return <div id="errorMessage">
        {errorMessages.map((m, i) => <div key={i}>{m}</div>)}
    </div>;

};
