const uniqid = require("uniqid");
let mereni = new Array();
exports.apiStopky = function(req, res, q) {
    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
    let obj = {};
    if (q.pathname === "/stopky/start") {
        let m = {};
        m.tmStart = new Date().getTime();
        let id = uniqid();
        mereni[id] = m;
        obj.id = id;
        obj.status = "Started";
        obj.m = mereni;
        res.end(JSON.stringify(obj));
    } else if (q.pathname === "/stopky/stop") {
        let tmStop = new Date().getTime();
        let id = q.query["id"];
        let m = mereni[id];
        obj.status = "Stopped";
        obj.m = mereni;
        obj.durSec = ((tmStop - m.tmStart) / 1000).toFixed(1);
        res.end(JSON.stringify(obj));
    }
};