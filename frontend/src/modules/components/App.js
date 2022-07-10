module.exports = ({ components, pureComponents }) => () => {

    return <div>
        <div className="title">
            <img src="images/steamrobo.png" />
            <div className="name">Charlie Moukbel</div>
            <div className="role">Gaffer</div>
            <a href="#contact-me">Contact Me</a>
        </div>

        <div id="portfolio-container">
            <pureComponents.Portfolio />
        </div>
        <div id="message-container">
            <components.ContactMe />
        </div>
    </div>;

};
