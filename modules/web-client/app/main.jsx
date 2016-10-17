const React = require('react');
const ReactDOM = require('react-dom');
const Portfolio = require('./portfolio');
ReactDOM.render(<Portfolio/>, document.getElementById('portfolio-container'));

const Message = require('./message');
ReactDOM.render(<Message/>, document.getElementById('message-container'));
