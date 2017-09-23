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
    res.write('<ol style="margin: 20px;">');
    res.write('<li style="list-style-type: decimal-leading-zero;padding: 5px;"><a href="/sobre.html">Sobre</a></li>');
    res.write('<li style="list-style-type: decimal-leading-zero;padding: 5px;"><a href="/aleatorios.html">Aleatórios</a></li>');
    res.write('<li style="list-style-type: decimal-leading-zero;padding: 5px;"><a href="/primos.html?n1=1&n2=10">Primos</a></li>');
    res.write('<li style="list-style-type: decimal-leading-zero;padding: 5px;"><a href="/equacao.html">Equação</a></li>');
    res.write('<li style="list-style-type: decimal-leading-zero;padding: 5px;"><a href="/xadrez.html">Xadrez</a></li>');
    res.write('</ol>');
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

function equacaoSegundoGrau(req, res) {
    if (req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<h1>Termos da equação de segundo grau</h1>");
        res.write("<form method=post>");
        res.write("<label>Termo a: </label>");
        res.write("<input type=text name=a /><br />");
        res.write("<label>Termo b: </label>");
        res.write("<input type=text name=b /><br />");
        res.write("<label>Termo c: </label>");
        res.write("<input type=text name=c /><br />");
        res.write("<input type=submit />");
        res.write("</form>");
        res.end();
    }
    else {
        var body = "";
        req.on("data", function (data) {
            body += data;
            console.log(body);
        });
        req.on('end', function () {
            var dados = qs.parse(body);
            var a = dados.a;
            var b = dados.b;
            var c = dados.c;
            console.log("a: " + a + ", b: " + b + ", c: " + c);

            res.writeHead(200, { "Content-Type": "text/html;" });
            res.write("<h1>Termos da equação de segundo grau</h1>");
            res.write("<h2>Calculando (" + a + ")x² + (" + b + ")x + (" + c + ")</h2>");
            if (a == null || b == null || c == null) {
                res.write("Números ausentes");
            }
            else {

                var delta = Math.pow(b, 2) - 4 * a * c;
                if (delta < 0) {
                    res.write("<h3> Não existem raizes reais! </h3>");
                }
                // else if (delta == 0) {
                //     var res = -(b) / (2 * a);
                //     res.write("<h3> As duas raizes são iguais e valem: " + res + "</h3>");
                // }
                else {
                    var raiz = Math.sqrt(delta);
                    var x1 = (-(b) - raiz) / (2 * a);
                    var x2 = (-(b) + raiz) / (2 * a);
                    res.write("<h3> x1 = " + x1 + " e <br /> x2 = " + x2 + "</h3>");
                }

            }

            res.end();
        })
    }
}

function tabuleiroXadrez(req, res) {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write("<h1>Tablueiro de Xadrez</h1>");
    res.write("<br/><br/><table style='border-collapse: collapse; padding: 0;border: 1px solid #000;margin-left: 50px;'>");
    for(var i = 0;i<8;i++){
        res.write("<tr>");
        for(var j = 0; j < 8; j++){
            if(i%2==j%2){
                res.write("<td style='height: 50px; width: 50px; background-color: #fff' id=" + i + j + "></td>");
            }
            else{
                res.write("<td style='height: 50px; width: 50px; background-color: #333' id=" + i + j + "></td>");
            }
        }
        res.write("</tr>");
    }
    res.write("</table>");
    res.end();
}

exports.naoEncontrado = naoEncontrado;
exports.helloLog = helloLog;
exports.sobre = wonderWoman;
exports.aleatorios = numerosAleatorios;
exports.primos = numerosPrimos;
exports.equacao = equacaoSegundoGrau;
exports.xadrez = tabuleiroXadrez;