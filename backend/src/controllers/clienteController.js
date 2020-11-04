// carregando arquivos/depêndencias necessárias

const Cliente = require('./../models/cliente');

// route de cadastro
exports.Show = async (req, res) => {
  try {
    const todosClientes = await Cliente.findAll();
    res.json(todosClientes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Index = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (cliente === null) {
      return res.json({
        error: `Cliente não cadastrado! `,
      });
    }

    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Insert = async (req, res) => {
  try {
    const novoCliente = await Cliente.create(req.body);
    res.json(novoCliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Update = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (cliente === null) {
      return res.json({
        error: `Cliente não cadastrado! `,
      });
    }

    await cliente.update(req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.Destroy = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (cliente === null) {
      return res.json({
        error: `Cliente não cadastrado! `,
      });
    }

    await cliente.destroy(req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
