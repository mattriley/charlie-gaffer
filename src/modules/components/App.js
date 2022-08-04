module.exports = ({ components, pureComponents }) => () => {

    return <div>
        <div id="header">
            <a href="#contact-me">CONTACT ME</a>
        </div>
        <pureComponents.TitleBar />
        <pureComponents.Portfolio />
        <components.ContactMe />
    </div>;

};
