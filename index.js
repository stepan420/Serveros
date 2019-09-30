const http = require("http");

const DNY = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrek", "Pátek", "Sobota"];
let citac = 0;
let blip = 1;

http.createServer((req, res) => {
    if (req.url === "/"){citac++}
    if (req.url === "/blipblop") {
        blip = blip * -1;
        if (blip === 1) {
            res.writeHead(200, {"Content-type": "text/html"});
            res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Flip Flop</body></html>")

        }
        if (blip === -1) {
            res.writeHead(200, {"Content-type": "text/html"});
            res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Blip Blop</body></html>")

        }
    }
    else if (req.url === "/jsondemoperson"){
        res.writeHead(200, {"Content-type":"application/json"});
        let obj = {};
        obj.jmeno = "Bob";
        obj.prijmeni = "Bobíček";
        obj.rokNarozeni = 2069;
        res.end(JSON.stringify(obj))
    }
    else if (req.url === "/jsoncitac") {
        res.writeHead(200, {"Content-type": "application/json"});
        let obj = {};
        obj.pocetVolani = citac;
        res.end(JSON.stringify(obj))
    }
    else if (req.url === "/dentyd") {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
        let d = new Date();
        let obj = {};
        obj.Datum = d;
        obj.casus = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        obj.date = d.getDate() + ". " + (d.getMonth()+1) + ". " + d.getFullYear();
        obj.dnycsk = DNY[d.getDay()];
        res.end(JSON.stringify(obj))
    }
    else{
        res.writeHead(200, {"Content-type":"text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Počet volání: "+citac+"</body></html>")
    }

}).listen(88);
