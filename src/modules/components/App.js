module.exports = ({ react, components, effects }) => () => {

    react.useEffect(() => {
        effects.trackEvent('pageview');
    }, []);

    const footerRef = react.useRef();

    const scrollToFooter = () => footerRef.current.scrollIntoView({ behavior: 'smooth' });

    return <div id="container">
        <div id="contact-me-link">
            <a onClick={scrollToFooter}>Contact Me</a>
        </div>
        <div id="header">
            <components.TitleBar />
        </div>
        <div id="content">
            <components.Portfolio />
        </div>
        <div id="footer" ref={footerRef}>
            <components.ContactMe />
        </div>
    </div>;

};
