var exec = require("child_process").exec;
var qs = require("querystring");


function helloLog(req, res) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Menu</h1>");
        res.write('<ul>');
        res.write('</li><a href="/sobre.html">Sobre</a></li>');
        res.write('');
        res.write('');
        res.write('');
        res.write('');
        res.write('</ul>');
        res.end();    
}

exports.helloLog = helloLog;