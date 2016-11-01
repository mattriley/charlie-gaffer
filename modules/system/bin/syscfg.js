#!/usr/bin/env node

const _ = require('lodash');
const config = require('../system-config');
const output = Object.keys(config).map(k => `export ${_.snakeCase(k).toUpperCase()}=${config[k]}`).join("\n");
console.log(output);
