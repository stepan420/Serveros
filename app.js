const createSpaServer = require("spaserver").createSpaServer;
const PORT = 8080;
const apiDenVTydnu = require("./api-denvtydnu").apiDenVTydnu;
const apiSvatky = require("./api-svatky").apiSvatky;
const apiChat = require("./api-chat").apiChat;
//const apiStopky = require("./api-stopky").apiStopky;
const apiUsers = require("./api-users").apiUsers;

function processApi(req, res) {
    if (req.pathname === "/dentyd") {apiDenVTydnu(req, res)}
    else if (req.pathname === "/svatky") {apiSvatky(req, res)}
    else if (req.pathname.startsWith("/chat/")) {apiChat(req, res)}
    //else if (req.pathname.startsWith("/stopky/")) {apiStopky(req, res)}
    else if (req.pathname.startsWith("/users/")) {apiUsers(req, res)}
    else {
        res.writeHead(200, {"Content-type": "text/html"});
        res.end("<html style='font-family: Calibri; font-size: 500px' lang='cs'><head><meta charset='UTF8'><title>BYL JSI VYTROLEN</title></head><body>LIBTARDE</body></html>")
    }
}
createSpaServer(PORT, processApi);
//ssh -L 127.0.0.1:3306:store5.rosti.cz:3306 -p 16407 app@node-14.rosti.cz