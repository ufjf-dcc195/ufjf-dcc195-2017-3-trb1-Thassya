var exec = require("child_process").exec;
var qs = require("querystring");

function helloLog(req, res) {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write("<h1>Menu</h1>");
    res.write('<ol>');
    res.write('<li><a href="/sobre.html">Sobre</a></li>');
    res.write('<li><a href="/aleatorios.html">Aleatórios</a></li>');
    res.write('');
    res.write('');
    res.write('');
    res.write('</0l>');
    res.end();
}

function wonderWoman(req, res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Sobre Mim</h1>");
    res.write("<p>Thassya de Souza Abreu</p>");
    res.write("<p>200876005</p>");
    res.write("<p>thayowisky@gmail.com</p>");
    res.write("<p>Sistemas de Informação</p>");
    res.end();
}

function numerosAleatorios(req, res) {
    var npares = [];
    var nimpares = [];

    for (var i = 0; i < 100; i++) {
        var num = Math.floor(Math.random() * 100);
        if (num % 2 == 0)
            npares.push(num);
        else
            nimpares.push(num);
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Listas Pares e Ímpares</h1>");

    res.write("<table width=100%>");
    res.write("<tr>");
    res.write("<th> Pares </th>");
    res.write("");
    for (var i = 0; i < npares.length; i++) {
        res.write("<td>" + npares[i] + "</td>");
    }
    res.write("</tr>");

    res.write("<tr>");
    res.write("<th>Ímpares</th>");
    res.write("");
    for (var i = 0; i < nimpares.length; i++) {
        res.write("<td>" + nimpares[i] + "</td>");
    }
    res.write("</tr>");
    res.write("</table>");
    res.end();
}

exports.helloLog = helloLog;
exports.sobre = wonderWoman;
exports.aleatorios = numerosAleatorios;