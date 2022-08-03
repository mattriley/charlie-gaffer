module.exports = ({ config }) => () => {

    return <div className="title">
        <img src="images/steamrobo.png" />
        <div className="name">{config.appName}</div>
        <a href="#contact-me">Contact Me</a>
    </div>;

};
