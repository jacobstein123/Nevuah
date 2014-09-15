'use strict';
var _ = require("underscore")
var bodyParser = require('body-parser');
var mongojs = require("mongojs");
var db = mongojs("nevuah");
module.exports = function(app) {
    // Root routing
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.raw());
    app.use(bodyParser.text());
    var core = require('../../app/controllers/core');
    app.route('/').get(core.index);

    app.post("/createschool", function(req, res) {
        var req_params = ["school", "admin_name", "admin", "passwd"];
        var given_params = req.body;
        for (var param in req_params) {
            var param = req_params[param]
            if (param in given_params) {} else {
                res.send("You forgot to provide the " + param + " param");
                break;
            }
        }
        //everything is in if it is here
        var school_id = _.uniqueId("school_");
        var school = db.collection("school");
        school.insert({
            "name": given_params.school,
            "id": school_id
        })
        //create uuid for school
        var user = db.collection("user");
        var adminID = _.uniqueId("admin_")
        user.insert({
            "name": given_params.admin,
            "id": adminID,
            "type": 0,
            "schoolId": school_id,
            "adminEmail": given_params.admin,
            "passwd": given_params.passwd
        });
        //create authkey for the admin
        var authkey = db.collection("authkey");
        var key = _.uniqueId("auth_");
        var expires = new Date();
        expires.setDate(expires.getDate() + 1);
        authkey.insert({
            user: adminID,
            authkey: key,
            expires: expires
        });
        res.send({
            "authkey": key,
            "user": adminID,
            "schoolId": school_id
        });
    });
    app.post("/createteacher", function(req, res) {
        var req_params = ["school", "authkey", "teacher", "email", "passwd"];
        var given_params = req.body;
        for (var param in req_params) {
            var param = req_params[param]
            if (param in given_params) {} else {
                res.send("You forgot to provide the " + param + " param");
                break;
            }
        };
        var authkey = db.collection("authkey");
        authkey.count({
            authkey: given_params.authkey,
            expires: {
                $gt: new Date()
            }
        }, function(err, count) {
            if (count > 0) {
                var user = db.collection("user");
                var teacherId = _.uniqueId("teacher_")
                user.insert({
                    "name": given_params.teacher,
                    "id": teacherId,
                    "type": 1,
                    "schoolId": given_params.school,
                    "email": given_params.email,
                    "passwd": given_params.passwd
                });
                console.log("created")
                res.send("teacher created");
            } else {
                console.log({
                    "error": "auth has expired"
                })
                res.send("authkey has expired");
            }
        });
    });
    app.post("/createstudent", function(req, res) {
        var req_params = ["school", "authkey", "email", "passwd", "name"];
        var given_params = req.body;
        for (var param in req_params) {
            var param = req_params[param]
            if (param in given_params) {} else {
                res.send("You forgot to provide the " + param + " param");
                break;
            }
        };
        var authkey = db.collection("authkey");
        authkey.count({
            authkey: given_params.authkey,
            expires: {
                $gt: new Date()
            }
        }, function(err, count) {
            if (count > 0) {
                var user = db.collection("user");
                var studentId = _.uniqueId("student_")
                user.insert({
                    "name": given_params.teacher,
                    "id": studentId,
                    "type": 2,
                    "schoolId": given_params.school,
                    "email": given_params.email,
                    "passwd": given_params.passwd
                });
                console.log("created")
                res.send("teacher created");
            } else {
                console.log({
                    "error": "auth has expired"
                })
                res.send("authkey has expired");
            }
        });

    });
    app.post("/signin", function(req, res) {
        var req_params = ["email", "passwd"];
        var given_params = req.body;
        for (var param in req_params) {
            var param = req_params[param]
            if (param in given_params) {} else {
                res.send("You forgot to provide the " + param + " param");
                break;
            }
        };
        var user = db.collection("user");
        user.findOne({
            "email": given_params.email
        }, function(err, result) {
            console.log(result);
            if (result[0].passwd == given_params.passwd) {
                res.send({
                    "congradulations!": " You are a horse"
                })
            } else {
                res.send("error, incorrect sign in")
            }
        });
    });
};
