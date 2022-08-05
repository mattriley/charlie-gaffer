module.exports = ({ components, pureComponents }) => () => {

    return <div>
        <div id="contact-me-link">
            <a href="#contact-me">CONTACT ME</a>
        </div>
        <div id="header">
            <pureComponents.TitleBar />
        </div>
        <div id="content">
            <pureComponents.Portfolio />
        </div>
        <div id="footer">
            <components.ContactMe />
        </div>
    </div>;

};
