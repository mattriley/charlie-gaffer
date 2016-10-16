var app = require('./lib/app');
var port = process.env.PORT;
console.log('Port is ' + port);
app.listen(port);