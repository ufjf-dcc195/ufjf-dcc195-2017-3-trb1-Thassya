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

function wonderWoman(req,res){
    res.writeHead(200, {"Content-Type": "text/html"});
    res.writehead("<h1>Menu</h1>");
    res.writeHead("<p>Thassya de Souza Abreu</p>");
    res.writeHead("<p>200876005</p>");
    res.writeHead("<p>thayowisky@gmail.com</p>");
    res.writeHead("<p>Sistemas de Informação</p>");
    res.end();
}

exports.helloLog = helloLog;
exports.sobre = wonderWoman;