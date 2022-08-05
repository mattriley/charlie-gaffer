<%- lib.renderOpening() %>

## Architecture

<%- await lib.compose(c => lib.renderCode(c.mermaid(), 'mermaid'), 'src/compose.js') %>
