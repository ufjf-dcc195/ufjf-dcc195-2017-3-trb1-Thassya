var http = require("http");
var url = require("url");

function start(router, handlers){
  http.createServer(function (req, res){
    var urlParsed  = url.parse(req.url, true);
    router.route(urlParsed.pathname, handlers, req, res);
  }).listen(3000);
  console.log("Servidor rodando em http://localhost:3000");
}

module.exports.start = start;