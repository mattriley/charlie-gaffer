const { createRoot } = require('react-dom/client');
const compose = require('./compose');

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const isSynthethic = params.synth === '1';

const compositionName = 'Charlie Gaffer';
const configs = [{ isSynthethic }];
const { components } = compose({ compositionName, window, configs });

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<components.App />);
