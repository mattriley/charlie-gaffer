(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', process.env.GOOGLE_ANALYTICS_TRACKING_ID, 'auto');
ga('send', 'pageview');

const React = require('react');
const ReactDOM = require('react-dom');
const Portfolio = require('./portfolio');
ReactDOM.render(<Portfolio/>, document.getElementById('portfolio-container'));

const Message = require('./message');
ReactDOM.render(<Message apiUrl={process.env.API_URL} googleRecaptchaSiteKey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}/>, document.getElementById('message-container'));


