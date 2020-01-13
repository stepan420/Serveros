const Entities = require('html-entities').AllHtmlEntities;
const entities = new Entities();
const fs = require("fs");
const crypto = require("crypto");
let users = new Array();
if (fs.existsSync("users.json")){
    users = JSON.parse(fs.readFileSync("users.json"))
}
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
                obj.name = entities.encode(body.name);
                let salt = body.pass.split("").reverse().join("");
                obj.password = crypto.createHmac("sha256", salt).update(body.pass).digest("hex");
                obj.email = entities.encode(body.email);
                let userExists = false;
                for (let u of users){if(u.name === obj.name){userExists = true; break}}
                if (userExists){obj.error = "prej ses gej"; res.end(JSON.stringify(obj))}
                else{
                    users.push(obj);
                    fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
                    res.end(JSON.stringify(obj));
                }
            }
        })
    }
    else if(q.pathname === "/users/listusers"){
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));
    }
};