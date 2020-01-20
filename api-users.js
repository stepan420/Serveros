const fs = require("fs");
const crypto = require("crypto");
let users = new Array();
if (fs.existsSync("users.json")){users = JSON.parse(fs.readFileSync("users.json"))}

exports.apiUsers = function(req, res) {
    res.writeHead(200, {"Content-type": "application/json"});
    if (req.pathname === "/users/listusers") {
        let obj = {};
        obj.users = users;
        res.end(JSON.stringify(obj));
    }
    else if (req.pathname === "/users/adduser") {
        let obj = {};
        obj.name = req.parameters.name;
        let salt = req.parameters.pass.split("").reverse().join("");
        obj.password = crypto.createHmac("sha256", salt).update(req.parameters.pass).digest("hex");
        obj.email = req.parameters.email;
        let userExists = false;
        for (let u of users) {
            if (u.name === obj.name ) {userExists = true; break}
        }
        if (userExists) {
            obj.error = "Jméno už existuje";
            res.end(JSON.stringify(obj))
        } else {
            users.push(obj);
            fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
            res.end(JSON.stringify(obj));
        }
    }
};