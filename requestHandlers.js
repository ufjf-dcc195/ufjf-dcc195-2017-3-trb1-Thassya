var exec = require("child_process").exec;
var qs = require("querystring");


function helloLog(req, res) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Hello Word!</h1>");
        res.end();    
}

exports.helloLog = helloLog;