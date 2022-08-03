require('./app.css');
const React = require('react');
const { createRoot } = require('react-dom/client');
const compose = require('./compose');

const compositionName = 'Charlie Gaffer';
const composition = compose({ compositionName, window });
const { modules } = composition;

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<React.StrictMode><modules.components.App /></React.StrictMode>);
