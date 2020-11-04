//obtendo acesso ao sequelize
const Sequelize = require('sequelize');
const sequelize = require('../database/database');

// criando a table 'produto'

const Produto = sequelize.define(
  'produto',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    valor_custo: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    valor_venda: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    qtd_estoque: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Produto;

// const itemProduto = require('./itemProduto');
// Produto.belongsToMany(itemProduto, {
//   foreignKey: 'id_produto',
//   through: 'itemProduto',
//   as: 'produtos',
// });
