var server = require('./server');
var router = require('./router');
var requestHandlers = require("./requestHandlers");

var handlers = {};
handlers['/'] = requestHandlers.helloLog;
handlers['/index.html'] = requestHandlers.helloLog;
handlers['/sobre.html'] = requestHandlers.sobre;

server.start(router,handlers);