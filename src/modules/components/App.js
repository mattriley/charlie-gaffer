module.exports = ({ react, components, effects, constants }) => () => {

    react.useEffect(() => {
        effects.trackEvent('pageview');
    }, []);

    const contactRef = react.useRef();

    const scrollToContact = () => contactRef.current.scrollIntoView({ behavior: 'smooth' });

    return <div id="container">
        <div id="contact-me-link">
            <a onClick={scrollToContact}>Contact Me</a>
        </div>
        <div id="header">
            <components.TitleBar />
        </div>
        <div id="content">
            <components.Portfolio />
        </div>
        <div id="contact-me" ref={contactRef}>
            <components.ContactMe />
        </div>
        <div id="footer">
            <dev-bar app-name={constants.appName}></dev-bar>
        </div>
    </div>;

};
