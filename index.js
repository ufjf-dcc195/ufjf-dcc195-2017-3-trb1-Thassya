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
handlers['/equacao.html'] = requestHandlers.equacao;
handlers['/xadrez.html'] = requestHandlers.xadrez;
handlers['/xadrez.json'] = requestHandlers.xadrexJ;


server.start(router,handlers);