var router = express.Router();

var pedidoController = require("../controllers/pedidoController");

//Todos os pedidos
router.get('/', campanhaController.getAllPedidos);

//Criar um pedido
router.post('/add', pedidoController.createPedido);

//Procurar um pedido
router.get('/getPedido/:id', pedidoController.getByIdPedido);

//Delete pedido
router.get('/deletePedido/:id',pedidoController.deletePedido);

//Update pedido
router.get('/updatePedido/:id', pedidoController.updatePedido);

module.exports = router;
