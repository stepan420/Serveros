let msgs = new Array();
exports.apiChat = function(req, res, q){
    if (q.pathname === "/chat/listmsgs") {
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));
    }else if (q.pathname === "/chat/addmsgs"){
        res.writeHead(200, {"Content-type": "application/json", "Access-Control-Allow-Origin": "*"});
        let obj = {};
        obj.text = q.query["msg"];
        obj.name = q.query["name"];
        obj.time = new Date;
        msgs.push(obj);
        res.end(JSON.stringify(obj));
    }
};