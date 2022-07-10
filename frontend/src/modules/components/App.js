module.exports = ({ components, pureComponents }) => () => {

    return <div>
        <pureComponents.TitleBar />
        <pureComponents.Portfolio />
        <components.ContactMe />
    </div>;

};
