require('./app.css');
const { createRoot } = require('react-dom/client');
const compose = require('./compose');

const fonts = document.createElement('link');
fonts.rel = 'stylesheet';
fonts.href = 'https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed';
document.head.append(fonts);

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const isSynthethic = params.synth === '1';

const compositionName = 'Charlie Gaffer';
const configs = [{ isSynthethic }];
const composition = compose({ compositionName, window, configs });
const { modules } = composition;

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<modules.components.App />);
