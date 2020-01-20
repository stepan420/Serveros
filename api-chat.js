let msgs = new Array();

exports.apiChat = function(req, res) {
    res.writeHead(200, {"Content-type": "application/json"});
    if (req.pathname === "/chat/listmsgs") {
        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));
    } else if (req.pathname === "/chat/addmsgs") {
        let obj = {};
        obj.text = req.parameters.msg;
        obj.name = req.parameters.name;
        obj.time = new Date;
        msgs.push(obj);
    }
};