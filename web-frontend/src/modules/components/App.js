module.exports = ({ components }) => () => {

    return <div>
        <div class="title">
            <img src="images/steamrobo.png" />
            <div class="name">Charlie Moukbel</div>
            <div class="role">Gaffer</div>
            <a href="#contact-me">Contact Me</a>
        </div>

        <div id="portfolio-container">
            <components.Portfolio />
        </div>
        <div id="message-container">
            <components.Message />
        </div>
    </div>;

};
