const { createRoot } = require('react-dom/client');
const compose = require('./compose');

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
