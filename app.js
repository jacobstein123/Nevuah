var express = require('express');
var app = express();
var _ = require("underscore")
var bodyParser = require('body-parser');
var mongojs = require("mongojs");
var db= mongojs("nevuah");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.post("/createschool", function(req, res) {
    req_params = ["school","admin_name", "admin", "passwd"];
    given_params = req.body;
    for (var param in req_params) {
        var param = req_params[param]
        if (param in given_params) {
        } else {
            res.send("You forgot to provide the " + param + " param");
            break;
        }
    }
    //everything is in if it is here
    //create uuid for school
    var school_id = _.uniqueId("school_");
    var user=db.collection("user");
    var adminID= _.uniqueId("admin_")
    user.insert({"name":given_params.admin, "id":adminID, "type":0, "schoolId":school_id,"school":given_params.school, "adminEmail":given_params.admin, "passwd":given_params.passwd});
    //create authkey for the admin
    var authkey=db.collection("authkey");
    var key= _.uniqueId("auth_");
    authkey.insert({user:adminID, authkey:key});
    res.send({"authkey":key, "user":adminID}); 
});
var server = app.listen(3000, function() {
    console.log('listening on port %d', server.address().port);
});
