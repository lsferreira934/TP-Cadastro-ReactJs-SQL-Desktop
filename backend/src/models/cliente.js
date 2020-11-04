//obtendo acesso ao sequelize
const Sequelize = require('sequelize');
const sequelize = require('../database/database');
const { Association } = require('sequelize');

// criando a table 'cliente'
const Cliente = sequelize.define(
  'cliente',
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
    end: {
      type: Sequelize.STRING(200),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    telefone: {
      type: Sequelize.STRING(12),
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Cliente;

// const Pedido = require('./pedido');
// Cliente.hasMany(Pedido, {
//   foreignKey: 'id_cliente',
//   as: 'pedidos',
// });
