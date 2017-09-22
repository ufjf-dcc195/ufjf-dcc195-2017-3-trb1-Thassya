var server = require('./server');
var router = require('./router');
var requestHandlers = require("./requestHandlers");

var handlers = {};
handlers['/'] = requestHandlers.helloLog;

server.start(router,handlers);