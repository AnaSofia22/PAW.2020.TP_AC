var mongoose = require("mongoose");
var path = require('path');
var http = require('http');
var pedidoControllerOpt = {};

pedidoControllerOpt.add = function(req, res){

    var pedido;
    var pro = new Promise(function(resolve, reject){

        var tempPedido ={
            pedido :{
                utente:req.body.utente,
                estado: req.body.estado,
                notas: req.body.notas,
                resultado: req.body.resultado
            },
        }

        var details = JSON.stringify(tempPedido);
        var options ={
            hostname: 'localhost',
            port: 8080,
            path: '/pedido/add',
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            'Content-Length': details.length
        }
    };

    var newReq = http.request(options,(res) =>{
        res.setEncoding('utf-8');

        res.on('data', (d) => {
            pedido = d;

            if(pedido == 'null'){
                reject();
            }else{
                resolve();
            }
        });
    });
    newReq.on('error', (error) => {
        reject();
    });
    newReq.write(details);
    newReq.end();

});
p1.then(function(){
    res.redirect('/');
})

pro.then(function () {
    req.flash('success_msg', 'Pedido criado');
    res.redirect("/");
}, function () {
    req.flash('error_msg', 'Erro!');
    res.redirect("/");
});

};

pedidoControllerOpt.delete = function(req, res){
    var pedido;
    var options ={
        hostname: 'localhost',
        port: 8080,
        path: '/pedido/deletePedido' + req.params.id,
        method: 'DELETE',
    };
    var p1 = new Promise(function (resolve, reject) {
        var newReq = http.request(options, (res) => {

            res.setEncoding('utf-8');

            res.on('data', (d) => {
                pedido = d;
                resolve();
            });
        });

        newReq.on('error', (error) => {
            console.log(error);
        });
        newReq.end();

    })

    p1.then(function () {

        campanha = JSON.parse(campanha);
        if (campanha.nModified == 0) {
            req.flash('error_msg', 'Ocorreu um erro');
            res.redirect("/");

        } else {
            req.flash('success_msg', 'Apagado com sucesso');
            res.redirect("/");
        }
    });

};

pedidoControllerOpt.getAll = function(req, res){
    var pedidos= "";
    var options ={
        hostname :'localhost',
        port:8080,
        path:'/pedidos/'
    };

var p1 = new Promise(function(resolve, reject){
        var  newReq = http.get(options, function(res){
            console.log('statusCode:${res.statusCode}');
            res.setEncoding('utf-8');
            res.on('data', function(d){
                pedidos += d;
                resolve();
            });
        });
        newReq.on('error', (error) => {
            req.flash('error_msg', 'Ocorreu um erro');
            res.redirect("/");
        });
    });

    p1.then(function(){
        res.render('../views/index',{
            title:'COVID 19',
            pedidos:JSON.parse(pedidos)
        });
    });

};



pedidoControllerOpt.getPedidoById = function(req, res){

    var pedido ="";
    
    var options = {
            hostname: 'localhost',
            port: 8080,
            path: '/pedido/getPedido' + req.params.id,
        }
    
    var p1 = new Promise(function (resolve, reject) {
        var newReq = http.get(options, function (res) {
            res.setEncoding('utf-8');
            res.on('data', function (d) {
                pedido += d;
                resolve();
                });
            });
    
        newReq.on('error', (error) => {
            req.flash('error_msg', 'Ocorreu um erro');
            res.redirect("/");
            });
        });
                p1.then(function () {
    
        if (JSON.parse(campanha) == null) {
                req.flash('error_msg', 'Ocorreu um erro');
                res.redirect("/");
            } else {
    
                res.render("../views/pedido", { pedido: JSON.parse(pedido) });
            }
        });

pedidoControllerOpt.update = function(req, res){

    var pedidoCrea ={
        utente:req.body.utente,
                estado: req.body.estado,
                notas: req.body.notas,
                resultado: req.body.resultado 
    };

    var details=JSON.stringify(pedidoCrea);

    var options = {
        hostname: 'localhost',
        port: 8080,
        path: '/pedido/update/Pedido' + req.params.id,
        method:'POST',
        headers:{
            "Content-Type": "application/json",
            'Content-Length': details.length
        }
    }
    var pedido;
    var p1 = new Promise(function (resolve, reject) {
        var newReq = http.get(options, function (res) {
            
            res.setEncoding('utf-8');
            res.on('data', function (d) {
                pedido += d;
                resolve();
            });
        });

        newReq.on('error', (error) => {
            req.flash('error_msg', 'Ocorreu um erro');
            res.redirect("/");
        });
    });


    p1.then(function () {
    if(JSON.parse(pedido) == null){
        res.redirect('/');
    }else{
        res.render('../views/edit_pedido',{
            title:'Editar Pedido',
            pedido: JSON.parse(pedido)
        });
    }
    });

pedidoControllerOpt.addform = function(req, res){
res.render("../views/add_pedido",{
    title:'Adicionar Pedido'
    });
}

};
};

module.exports = pedidoControllerOpt;