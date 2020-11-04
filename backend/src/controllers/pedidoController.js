// carregando arquivos/depêndencias necessárias
const Pedido = require('./../models/pedido');
const Cliente = require('./../models/cliente');
const Produto = require('./../models/produto');

exports.Insert = async (req, res) => {
  try {
    const now = new Date();
    const data_venda = `${
      now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    }-${
      now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth()
    }-${now.getFullYear()} ${
      now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    }:${now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()}:${
      now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    }`;
    const { obs } = req.body;
    const id_pedido = 1;
    const todosPedido = await Pedido.findAll();
    let checarPedido = await Pedido.findOne({
      where: { id_pedido: id_pedido },
    });

    if (!checarPedido) {
      const novoPedido = await Pedido.create({
        id_pedido: id_pedido,
        data_venda,
        obs,
      });
      res.json(novoPedido);
    }

    const mapPedido = todosPedido.map((pedido) => pedido.id_pedido);
    if (checarPedido.id_pedido <= id_pedido) {
      const novoPedido = await Pedido.create({
        id_pedido: Math.max.apply(null, mapPedido) + 1,
        data_venda,
        obs,
      });
      res.json(novoPedido);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Update = async (req, res) => {
  try {
    const obsAtualizada = await Pedido.findOne({
      where: { id_pedido: req.params.id },
    });

    if (obsAtualizada === null) {
      return res.json({ error: `Produto não localizado!` });
    }

    await obsAtualizada.update(req.body);
    res.json(
      `Observação do pedido n° ${req.params.id} atualizada com sucesso!`
    );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Show = async (req, res) => {
  try {
    const todosPedidos = await Pedido.findAll();
    res.json(todosPedidos);
  } catch (error) {
    res.status(400).json(`Erro ao emitir relatório: ${error}`);
  }
};
