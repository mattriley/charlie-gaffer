module.exports = ({ react, components, effects }) => () => {

    react.useEffect(() => {
        effects.trackEvent('pageview');
    }, []);

    return <div id="container">
        <div id="contact-me-link">
            <a href="#contact-me">Contact Me</a>
        </div>
        <div id="header">
            <components.TitleBar />
        </div>
        <div id="content">
            <components.Portfolio />
        </div>
        <div id="footer">
            <components.ContactMe />
        </div>
    </div>;

};
