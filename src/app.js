require('./app.css');
const React = require('react');
const { createRoot } = require('react-dom/client');

const compose = require('./compose');
const composition = compose({ window });
const { modules, config } = composition;
window.app = composition;
window.document.title = config.app.name;

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<React.StrictMode><modules.components.App /></React.StrictMode>);
