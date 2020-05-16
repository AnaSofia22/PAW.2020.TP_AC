var mongoose = require("mongoose");
var path = require('path');
var http = require('http');
var User = require("../models/User");
const passport = require('passport');


var userController = {};

userController.userLogin = function (req, res, next) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};


userController.userLogout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/login');
    });
};
userController.sendHome = function (req, res, next) {
    var logUser = req.user;

    var pedidos = "";
    var options = {
        hostname: 'localhost',
        port: 8080,
        path: '/pedidos/getPedidos'
    };

    var p1 = new Promise(function (resolve, reject) {
        var newReq = http.get(options, function (res) {
            console.log(`statusCode:${res.statusCode}`);
            res.setEncoding('utf-8');
            res.on('data', function (d) {
                campanhas += d;
                resolve();

            });
        });

        newReq.on('error', (error) => {
            console.log(error);
        });
    });

    p1.then(function () {
        res.render("../views/index", { user: logUser, pedido: JSON.parse(pedidos) });


    });
};



userController.register = function (req, res) {
    req.body.username = req.body.username.toLowerCase();
    var user = new User(req.body);
    
    let errors = [];

    if (user.username.indexOf(' ') >= 0) {
        errors.push({ msg: "O nome de utilizador nao pode conter espaços" });
    }

    if (user.password.length < 6) {
        errors.push({ msg: "Password demasiado curta" });
    }

    if (errors.length > 0) {
        res.render('../views/Registo', { errors: errors, user: user });
    } else {


        user.save(function (err, createUser) {
            if (err) {
                console.log(err);
                errors.push({ msg: 'Este utilizador ja existe !' });
                res.render('../views/Registo', { errors: errors, user: user });
            } else {
                req.flash('success_msg', 'Registo efetuado com sucesso');
                res.redirect("/login");
            }
        });
    }


};

userController.firstPage = function (req, res) {
    var campanhas = "";
    var options = {
        hostname: 'localhost',
        port: 8080,
        path: '/pedidos/'
    };


    var p1 = new Promise(function (resolve, reject) {
        var newReq = http.get(options, function (res) {
            res.setEncoding('utf-8');
            res.on('data', function (d) {
                campanhas += d;
                resolve();

            });
        });

        newReq.on('error', (error) => {
            reject();
        });
    });

    p1.then(function () {

        res.render("../views/incial", { campanha: JSON.parse(pedidos)});
    });
};


module.exports = userController;