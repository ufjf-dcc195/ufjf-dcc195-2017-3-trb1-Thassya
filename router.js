function route(pathname, handlers, req, res) {
    console.log("Roteando: ", pathname);
    if(handlers[pathname]){
      handlers[pathname](req, res);
    }else{
      console.log("Requisição inválida em ", pathname);
      handlers["/404"](req, res);
    }
  }
  
  exports.route = route;
  