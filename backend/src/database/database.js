// Instânciando o ORM Sequelize
const Sequelize = require('sequelize');

// Configurando modo de desenvolvimento e produção
const environment = process.env.NODE_ENV || 'development';
const config = require('../config/config')[environment];

// Passando para o sequelize as configurações de acesso do database
const sequelize = new Sequelize(
    config.database.name,
    config.database.user,
    config.database.password,
    {
        host: config.database.host,
        dialect: config.database.dialect
    }
);

module.exports = sequelize;