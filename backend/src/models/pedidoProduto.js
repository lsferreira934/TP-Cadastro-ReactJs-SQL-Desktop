//obtendo acesso ao sequelize
const Sequelize = require('sequelize');
const sequelize = require('../database/database');

// criando a table 'item_Produto'

const PedidoProduto = sequelize.define(
  'pedidoProduto',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id_cliente: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'cliente', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    id_pedido: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'pedido', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    id_produto: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'produto', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantidade: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    valor_unidade: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    valor_total: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = PedidoProduto;

// const Produto = require('./produto');
// ItemProduto.belongsToMany(Produto, {
//   foreignKey: 'id_produto',
//   through: 'itemProduto',
//   as: 'produtos',
// });
// const Pedido = require('./pedido');
// ItemProduto.belongsToMany(Pedido, {
//   foreignKey: 'id_pedido',
//   through: 'itemProduto',
//   as: 'pedidos',
// });
