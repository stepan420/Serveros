const http = require("http");

let citac = 0;

http.createServer((req, res) => {
    if (req.url == "/"){citac++}
    if (req.url == "/blipblop"){
        res.writeHead(200, {"Content-type":"text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Flip Flop</body></html>")
    }
    else if (req.url == "/jsondemoperson"){
        res.writeHead(200, {"Content-type":"application/json"});
        let obj = {};
        obj.jmeno = "Bob";
        obj.prijmeni = "Bobíček";
        obj.rokNarozeni = 2069;
        res.end(JSON.stringify(obj))
    }
    else{
        res.writeHead(200, {"Content-type":"text/html"});
        res.end("<html lang='cs'><head><meta charset='UTF8'></head><body>Počet volání: "+citac+"</body></html>")
    }
}).listen(88);