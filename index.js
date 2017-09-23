var server = require('./server');
var router = require('./router');
var requestHandlers = require("./requestHandlers");

var handlers = {};

handlers['/'] = requestHandlers.helloLog;
handlers['/index.html'] = requestHandlers.helloLog;
handlers['/404'] = requestHandlers.naoEncontrado;
handlers['/sobre.html'] = requestHandlers.sobre;
handlers['/aleatorios.html'] = requestHandlers.aleatorios;
handlers['/primos.html'] = requestHandlers.primos;


server.start(router,handlers);