let users = new Array();
exports.apiUsers = function(req, res, q) {
    res.writeHead(200, {"Content-type": "application/json"});
    if(q.pathname === "/users/adduser"){
        let data = "";
        req.on('data', function(chunk){
            try {data += chunk}
            catch(e){console.error(e)}
        });
        req.on('end', function(){
            if (data){
                let body = JSON.parse(data);
                let obj = {};
                obj.name = body.name;
                obj.password = body.pass;
                obj.email = body.email;
                users.push(obj);
                res.end(JSON.stringify(obj));
            }
        })
    }else if(q.pathname === "/users/listusers"){
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));
    }
};