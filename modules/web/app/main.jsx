const React = require('react');
const ReactDOM = require('react-dom');
const Portfolio = require('./portfolio');
ReactDOM.render(<Portfolio/>, document.getElementById('portfolio-container'));

const Message = require('./message');
ReactDOM.render(<Message apiUrl={process.env.API_URL} googleRecaptchaSiteKey={process.env.GOOGLE_RECAPTCHA_SITE_KEY}/>, document.getElementById('message-container'));
