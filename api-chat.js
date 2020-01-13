const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
let msgs = new Array();

exports.apiChat = function(req, res, q){
    res.writeHead(200, {"Content-type": "application/json"});
    if (q.pathname === "/chat/listmsgs") {
        let obj = {};
        obj.messages = msgs;
        res.end(JSON.stringify(obj));
    }else if (q.pathname === "/chat/addmsgs") {
        let data = "";
        req.on('data', function(chunk){
            try {data += chunk}
            catch(e){console.error(e)}
        });
        req.on('end', function(){
            if (data){
                let body = JSON.parse(data);
                let obj = {};
                obj.text = entities.encode(body.msg);
                obj.name = entities.encode(body.name);
                obj.time = new Date;
                msgs.push(obj);
            }
        })
    }
};