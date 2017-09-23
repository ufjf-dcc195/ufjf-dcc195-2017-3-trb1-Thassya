var exec = require("child_process").exec;
var qs = require("querystring");
var url = require('url');

function naoEncontrado(req, res) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Ops.. Algo deu errado!");
    res.end();
}

function helloLog(req, res) {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write("<h1>Menu</h1>");
    res.write('<ol>');
    res.write('<li><a href="/sobre.html">Sobre</a></li>');
    res.write('<li><a href="/aleatorios.html">Aleatórios</a></li>');
    res.write('<li><a href="/primos.html?n1=1&n2=10">Primos</a></li>');
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

function numerosPrimos(req, res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<h1>Listas Números Primos</h1>");

    var endereco = req.url;
    var query = url.parse(endereco, true).query;
    
    var n1 = query.n1;
    var n2 = query.n2;

    if (n1 > n2 || n2 > 100 || n1 == null || n2 == null) {
        res.write("números inválidos");
    }
    else {
        res.write("<ol>");

        var i = 0, div = 0, count = 0;
        for (i = n1; i <= n2; i++) {
            for (div = 1; div <= i; div++) {
                if (i % div == 0) count++;
            }
            if (count == 2) {
                res.write("<li>" + i + "</li>");
            }
            count = 0;
        }
        res.write("</ol>");
    }
    res.end();
}


function exemplo(req, res) {
    if (req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>Digite a senha?</h1>");
        res.write("<form method=post>");
        res.write("<input type=text name=senha />");
        res.write("<input type=submit />");
        res.write("</form>");
        res.end();
    } else {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var dados = qs.parse(body);
            console.log(dados);
            res.writeHead(200, { "Content-Type": "text/html" });
            if (dados.senha == "54321") { res.write("<h1>Acertou!</h1>"); }
            else {
                res.write("<p> Não autorizado!</p>");
            }
            res.end();
        })

    }
}

exports.naoEncontrado = naoEncontrado;
exports.helloLog = helloLog;
exports.sobre = wonderWoman;
exports.aleatorios = numerosAleatorios;
exports.primos = numerosPrimos;