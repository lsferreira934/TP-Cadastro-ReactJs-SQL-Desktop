//obtendo acesso ao sequelize
const Sequelize = require('sequelize');
const sequelize = require('../database/database');

// criando a table 'pedido'
const Pedido = sequelize.define(
  'pedido',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_pedido: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    data_venda: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    obs: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Pedido;

// const Cliente = require('./cliente');
// Pedido.belongsTo(Cliente, {
//   foreignKey: 'id_cliente',
//   as: 'clientes',
// });

// const itemProduto = require('./itemProduto');
// Pedido.belongsToMany(itemProduto, {
//   foreignKey: 'id_pedido',
//   throught: 'itemproduto',
//   as: 'pedidoProduto',
// });
