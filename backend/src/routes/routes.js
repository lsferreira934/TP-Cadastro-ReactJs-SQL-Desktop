// arquivo de configuração de routes (roteamento)
const express = require('express');
const router = express.Router();
// carregando o ClienteController
const ClienteController = require('../controllers/clienteController');
// carregando o ProdutoController
const ProdutoController = require('../controllers/produtoController');
// carregando o PedidoController
const PedidoController = require('../controllers/pedidoController');
// carregando o PedidoProdutoController
const PedidoProdutoController = require('../controllers/pedidoProdutoController');

// Rotas de "Cliente"
router.post('/cliente', ClienteController.Insert);
router.get('/cliente', ClienteController.Show);
router.get('/cliente/:id', ClienteController.Index);
router.put('/cliente/:id', ClienteController.Update);
router.delete('/cliente/:id', ClienteController.Destroy);

// Rotas de "Produto"
router.post('/produto', ProdutoController.Insert);
router.get('/produto', ProdutoController.Show);
router.get('/produto/:id', ProdutoController.Index);
router.put('/produto/:id', ProdutoController.Update);
router.delete('/produto/:id', ProdutoController.Destroy);

// Rotas de "Pedido"
router.post('/novopedido', PedidoController.Insert);
router.put('/atualizarpedido/:id', PedidoController.Update);
router.get('/todospedidos', PedidoController.Show);

// Rotas de "Atendimento, reltório"
router.post('/pedidoproduto', PedidoProdutoController.Insert);

// Rotas de relatórios
router.get('/relatoriocompras', PedidoProdutoController.Show);
router.post('/pesquisacompra', PedidoProdutoController.Index);
router.get('/compras', PedidoProdutoController.Compras);
router.post('/compradetalhe', PedidoProdutoController.PedidoDetalhe);

//Rotas teste
router.get('/relatorio/:id', PedidoProdutoController.All);

module.exports = router;
