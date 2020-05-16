const mongoose = require('mongoose');
const Pedido = require('../models/pedido');

var pedidoController ={};

//Criar um Pedido 
pedidoController.createPedido = function(req, res, next){
    var pedido = new Pedido(req.body);

    pedido.save(function(err){
        if(err){
            next(err);
        }else{
            res.json(pedido);
        }
    });
};

//Apagar um Pedido
pedidoController.deletePedido = function(req, res, next){
    Pedido.deleteOne({_id: req.params.id}, function(err, result){
        if(err){
            next(err);
        }else{
            res.json(result);
        }
    });
};

//Listar todos pedidos
pedidoController.getAllPedidos = function(req, res, next){
    Pedido.find(function(err, pedidos){
        if(err){
            next(err);
        }else{
            res.json(pedidos);
        }
    });
};

// Listar um pedido 
pedidoController.getByIdPedido = function(req, res, next){
    Pedido.findById(req.params.id, function(err, pedido){
        if(err){
            next(err);
        }else {
            res.json(pedido);
        }
    });
};

//Editar/Update de um Pedido
pedidoController.updatePedido = function(req, res, next){
    Pedido.findOneAndUpdate(req.params.id,{
        $set:{
            utente : req.body.utente , notas : req.body.notas, teste : req.body.teste, resultado:req.body.resultado
        }
    },{new:true},function(err, pedido){
        if(err){
            next(err);
        }else{
            res.json(pedido);
        }
        });
    };
 module.exports = pedidoController;