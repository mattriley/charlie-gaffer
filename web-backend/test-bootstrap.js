const path = require('path');
const glob = require('glob');

glob.sync('./*(lib)/**/*.js').forEach(f => require(path.resolve(f)));