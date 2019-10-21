const http = require("http");
const fs = require("fs");
const url = require("url");
const apiDenVTydnu = require("./api-denvtydnu").apiDenVTydnu;
const apiSvatky = require("./api-svatky").apiSvatky;
const apiChat = require("./api-chat").apiChat;

function processStaticFiles(res, fileName) {
    fileName = fileName.substr(1);
    console.log(fileName);
    let contentType = "text/html";
    if (fileName.endsWith(".png")) {
        contentType = "image/png";
    } else if (fileName.endsWith(".jpg") || fileName.endsWith(".jpeg")) {
        contentType = "image/jpeg";
    }

    if (fs.existsSync(fileName)) {
        fs.readFile(fileName, function(err, data) {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        });
    } else {
        res.writeHead(404);
        res.end();
    }
}
http.createServer((req, res) => {
    console.log(req.url);
    let q = url.parse(req.url, true);
    console.log(q.pathname);
    if (q.pathname === "/") {
        processStaticFiles(res, "/index.html");
        return;
    }
    if (q.pathname.length - q.pathname.lastIndexOf(".") < 6) {
        processStaticFiles(res, q.pathname);
        return;
    }
    else if (q.pathname === "/dentyd") {apiDenVTydnu(req, res)}
    else if (q.pathname === "/svatky") {apiSvatky(req, res, q)}
    else if (q.pathname.startsWith("/chat/")){apiChat(req, res, q)}
    else{
        res.writeHead(200, {"Content-type":"text/html"});
        res.end("<html style='font-family: Calibri; font-size: 500px' lang='cs'><head><meta charset='UTF8'><title>BYL JSI VYTROLEN</title></head><body>LIBTARDE</body></html>")
    }
}).listen(88);
