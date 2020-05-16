const express = require('express');

var router = express.Router();

var pedidoContrll = require('../controllers/pedidoControllerOpt');

//Get All Pedidos
router.get('/', pedidoContrll.getAll);

//Criar pedido
router.post('/add', pedidoContrll.createPedido);

//Edit de pedido
router.post('/edit/:id', pedidoContrll.update)

//Delete Pedido
router.delete('/delete/:id', pedidoContrll.delete);

//Get Pedido
router.get('/getPedido/:id', pedidoContrll.getPedidoById);

module.exports = router;