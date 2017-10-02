var exec = require("child_process").exec;
var qs = require("querystring");
var url = require('url');

function naoEncontrado(req, res) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("Ops.. Algo deu errado!");
    res.end();
}

function helloLog(req, res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(folhaestilo());
    res.write(menu());
    res.write("<h1>Index</h1>");
    res.end();
}

function wonderWoman(req, res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(folhaestilo());
    res.write(menu());
    res.write("<div id=conteudo>");
    res.write("<h1>Sobre Mim</h1>");
    res.write("<p>Thassya de Souza Abreu</p>");
    res.write("<p>200876005</p>");
    res.write("<p>thayowisky@gmail.com</p>");
    res.write("<p>Sistemas de Informação</p>");
    res.write("</div>");
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
    res.write(folhaestilo());
    res.write(menu());
    res.write("<div id=conteudo>");
    res.write("<h1>Listas Pares e Ímpares</h1>");

    res.write("<h2>Pares</h2>");
    res.write("<ul class=pares>");
    for (var i = 0; i < npares.length; i++) {
        res.write("<li>" + npares[i] + "</li>");
    }
    res.write("</ul>");

    res.write("<h2>Ímpares</h2>");
    res.write("<ul class=pares>");
    for (var i = 0; i < nimpares.length; i++) {
        res.write("<li>" + nimpares[i] + "</li>");
    }
    res.write("</ul>");
    res.write("</div>");
    res.end();
}

function numerosPrimos(req, res) {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write(folhaestilo());
    res.write(menu());
    res.write("<div id=conteudo>");
    res.write("<h1>Listas Números Primos</h1>");

    var endereco = req.url;
    var query = url.parse(endereco, true).query;

    var n1 = query.n1;
    var n2 = query.n2;

    if (n1 > n2 || n2 > 100 || n1 == null || n2 == null) {
        res.write("números inválidos");
    }
    else {
        res.write("<ol class=primos>");

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
    res.write("</div>");
    res.end();
}

function equacaoSegundoGrau(req, res) {
    if (req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
        res.write(folhaestilo());
        res.write(menu());
        res.write("<div id=conteudo>");
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
        res.write("</div>");
        res.end();
    }
    else {
        var body = "";
        req.on("data", function (data) {
            body += data;
        });
        req.on('end', function () {
            var dados = qs.parse(body);
            var a = dados.a;
            var b = dados.b;
            var c = dados.c;

            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8;" });
            res.write(folhaestilo());
            res.write(menu());
            res.write("<div id=conteudo>");
            res.write("<h1>Termos da equação de segundo grau</h1>");

            console.log(a);
            if (a == "" || b == "" || c == "") {
                res.write("<h2>Números ausentes</h2>");
            }
            else {
                res.write("<h2>Calculando (" + a + ")x² + (" + b + ")x + (" + c + ")</h2>");
                var delta = Math.pow(b, 2) - 4 * a * c;
                if (delta < 0) {
                    res.write("<h3> Não existem raizes reais! </h3>");
                }
                else {
                    var raiz = Math.sqrt(delta);
                    var x1 = (-(b) - raiz) / (2 * a);
                    var x2 = (-(b) + raiz) / (2 * a);
                    res.write("<h3> x1 = " + x1 + " e <br /> x2 = " + x2 + "</h3>");
                }

            }
            res.write("</div>");

            res.end();
        });
    }
}

function tabuleiroXadrez(req, res) {
    if (req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(folhaestilo());
        res.write(menu());
        res.write("<div id=conteudo>");
        res.write("<h1>Tablueiro de Xadrez</h1>");
        res.write(xadrez());

        res.write("<div id=conteudo2>");
        res.write("<form method=post>");
        res.write("<label>Linha: </label>");
        res.write("<input type=text name=linha /><br />");
        res.write("<label>Coluna: </label>");
        res.write("<input type=text name=coluna /><br />");
        res.write("<input type=submit />");
        res.write("</div>");
        res.write("</div>");
        res.end();
    } else {
        var body = "";
        req.on("data", function (data) {
            body += data;
        });
        req.on('end', function () {
            var dados = qs.parse(body);
            var linha = dados.linha;
            var coluna = dados.coluna;

            res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
            res.write(folhaestilo());
            res.write(menu());
            res.write("<div id=conteudo>");
            res.write("<h1>Tablueiro de Xadrez</h1>");
            res.write(xadrez(linha, coluna));


            res.write("</div>");
            res.end();
        });
    }
}

function xadrezJson(req, res, next) {
    if (req.method == "GET") {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        res.write(folhaestilo());
        res.write(menu());
        res.write("<div id=conteudo>");
        res.write("<h1>Tablueiro de Xadrez</h1>");
        res.write(xadrez());

        res.write("<div id=conteudo2>");
        res.write("<form method=post>");
        res.write("<label>Linha: </label>");
        res.write("<input type=text name=linha /><br />");
        res.write("<label>Coluna: </label>");
        res.write("<input type=text name=coluna /><br />");
        res.write("<input type=submit />");
        res.write("</div>");
        res.write("</div>");
        res.end();
    } else {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var dados = qs.parse(body);
            var linha = dados.linha;
            var coluna = dados.coluna;

            var json = {Cavalo: linha + "," + coluna }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json));
        });
    }
}


function xadrez(l, c) {
    //cavalo: &#9816
    var tabela = " ";
    tabela += "<table id=xadrez>";
    for (var i = 0; i < 8; i++) {
        tabela += "<tr>";
        for (var j = 0; j < 8; j++) {
            if (i % 2 == j % 2) {
                if (l == i && j == c) {
                    tabela += "<td id=" + i + "," + j + ">&#9816</td>";
                }
                else {
                    tabela += "<td id=" + i + "," + j + "></td>";
                }
            }
            else {
                if (l == i && j == c) {
                    tabela += "<td id=" + i + "," + j + ">&#9816</td>";
                }
                else {
                    tabela += "<td id=" + i + "," + j + "></td>";
                }
            }
        }
        tabela += "</tr>";
    }
    tabela += "</table>";
    return tabela;
}

function folhaestilo() {
    var estilo = "";
    estilo += "<style>";
    estilo += "html {background-color: #fff;}";
    estilo += ".menu {list-style:none; float:left; }";
    estilo += ".menu li {position:relative; float:left; border-right:1px solid #c0c0c0; }";
    estilo += ".menu li a {color:#333; text-decoration:none; padding:5px 10px; display:block;}";
    estilo += ".menu li a:hover{background:#333; color:#fff; -moz-box-shadow:0 3px 10px 0 #CCC; -webkit-box-shadow:0 3px 10px 0 #ccc; text-shadow:0px 0px 5px #fff;}";
    estilo += "nav {padding: 20;} ";
    estilo += "td {font-size: 3em;height: 50px;width: 50px;}";
    estilo += "table#xadrez tr:nth-child(odd) td:nth-child(odd){background-color: #000; color: #fff;}";
    estilo += "table#xadrez tr:nth-child(even) td:nth-child(even){background-color: #000; color: #fff;}";
    estilo += "#conteudo { padding-left: 50; width: 50%; }";
    estilo += "#conteudo2 { width: 50%; }";
    estilo += "ul.pares { margin-right: 40px; }";
    estilo += "ul.pares li {list-style: none; padding:3px 5px;}";
    estilo += "ul.pares:nth-child(odd){float:left;}";
    estilo += "ol.primos li {list-style: none; padding:3px 5px;}";
    estilo += "input[type=text] { width: 100%; padding: 12px 20px; margin: 8px 0;  display: inline-block;}";
    estilo += "input[type=submit] {padding: 14px 20px;margin: 8px 0;border: none; cursor: pointer;}";
    estilo += "</style>";
    return estilo;
}

function menu() {
    var menu = "";
    // menu += "<h1>Menu</h1>";
    menu += "<nav><ul class=menu>";
    menu += "<li><a href='/sobre.html'>Sobre</a></li>";
    menu += "<li><a href='/aleatorios.html'>Aleatórios</a></li>";
    menu += "<li><a href='/primos.html?n1=1&n2=10'>Primos</a></li>";
    menu += "<li><a href='/equacao.html'>Equação</a></li>";
    menu += "<li><a href='/xadrez.html'>Xadrez</a></li>";
    menu += "<li><a href='/xadrez.html'>Xadrez.Json</a></li>";
    menu += "</ul></nav> <br/><br/>";

    return menu;
}
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

exports.naoEncontrado = naoEncontrado;
exports.helloLog = helloLog;
exports.sobre = wonderWoman;
exports.aleatorios = numerosAleatorios;
exports.primos = numerosPrimos;
exports.equacao = equacaoSegundoGrau;
exports.xadrez = tabuleiroXadrez;
exports.xadrexJ = xadrezJson;