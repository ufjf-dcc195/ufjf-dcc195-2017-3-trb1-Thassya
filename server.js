var http = require("http");
var url = require("url");
var fs = require("fs");

function start(router, handlers){
  http.createServer(function (req, res){
    var urlParsed  = url.parse(req.url, true);
    router.route(urlParsed.pathname, handlers, req, res);
    
    console.log("roteando em: " + urlParsed.pathname);
    
  }).listen(3000);
  console.log("Servidor rodando em http://localhost:3000");
}

// Funçao simples de gerenciamento a rotas.
var rotear = function (pathname) {
  if (pathname && pathname != "/") {
    var arquivo = __dirname + "/content/html/" + pathname;
    var existe = fs.existsSync(arquivo);
    if (existe) {
      return arquivo;
    }
    return __dirname + "/content/html/erro.html";
  }
  return __dirname + "/content/html/index.html";
};

module.exports.start = start;