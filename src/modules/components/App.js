module.exports = ({ react, components, pureComponents, effects }) => () => {

    react.useEffect(() => {
        effects.trackEvent('pageview');
    }, []);

    return <div>
        <div id="contact-me-link">
            <a href="#contact-me">Contact Me</a>
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
