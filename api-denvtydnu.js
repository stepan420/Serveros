const DNY = ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrek", "Pátek", "Sobota"];
exports.apiDenVTydnu = function(req, res){
    res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin":"*"});
    let d = new Date();
    let obj = {};
    obj.cas = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    obj.datum = d.getDate() + ". " + (d.getMonth()+1) + ". " + d.getFullYear();
    obj.dnycsk = DNY[d.getDay()];
    res.end(JSON.stringify(obj))
};