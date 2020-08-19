const http = require('http');

const requests = require('./routes.js')

const server = http.createServer(requests.handler);

server.listen(3000);

//test change