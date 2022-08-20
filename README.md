# Charlie Gaffer

<p align="right"><code>569 sloc</code>&nbsp;<code>23 files</code>&nbsp;<code>4 deps</code>&nbsp;<code>17 dev deps</code></p>

Professional lighting for film and TV.

<br />

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
    components-->ui;
    components-->effects;
    components-->config;
    effects-->io;
    effects-->config;
    io-->config;
    io-->mixpanel;
    io-->window;
    ui-->window;
```
<p align="center">
  <em>This diagram was generated with <a href="https://github.com/mattriley/node-module-composer">Module Composer</a></em>
</p>
<br>
