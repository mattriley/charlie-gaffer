# Charlie Gaffer Melbourne


<p align="right">
    <code>0% cov</code>&nbsp;
    <code>554 sloc</code>&nbsp;
    <code>19 files</code>&nbsp;
    <code>3 deps</code>&nbsp;
    <code>15 dev deps</code>
</p>

Professional lighting for film and TV.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Architecture](#architecture)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Architecture

###### <p align="right"><em>Can't see the diagram?</em> <a id="link-1" href="https://github.com/mattriley/charlie-gaffer#user-content-link-1">View it on GitHub</a></p>
```mermaid
graph TD;
    components-->react;
    components-->effects;
    components-->config;
    components-->window;
    effects-->io;
    effects-->mixpanel;
    effects-->config;
    io-->config;
    io-->window;
```
