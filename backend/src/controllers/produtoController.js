// carregando arquivos/depêndencias necessárias
const Produto = require('./../models/produto');

// route de cadastro
exports.Show = async (req, res) => {
  try {
    const todosProduto = await Produto.findAll();
    res.json(todosProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Index = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (produto === null) {
      return res.json({
        error: `Produto não cadastrado! `,
      });
    }

    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Insert = async (req, res) => {
  try {
    const novoProduto = await Produto.create(req.body);
    res.json(novoProduto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Update = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (produto === null) {
      return res.json({
        error: `Produto não cadastrado! `,
      });
    }

    await produto.update(req.body);
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Destroy = async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);

    if (produto === null) {
      return res.json({
        error: `Produto não cadastrado! `,
      });
    }

    await produto.destroy(req.body);
    res.json(produto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
