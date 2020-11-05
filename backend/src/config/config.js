// // Configurando strings de conexão: desenvolvimento e produção
// module.exports = {
//   development: {
//     database: {
//       host:
//         'ls-67fad9d658bbd6ecb7e62def7d6e089e11bd5d5c.cvjvzngnmdlt.us-east-1.rds.amazonaws.com',
//       port: '3306',
//       name: 'db_sistema_venda',
//       dialect: 'mysql',
//       user: 'dbmasteruser',
//       password: '12345678',
//     },
//   },
//   production: {
//     database: {
//       host: process.env.DB_HOST,
//       host: process.env.DB_PORT,
//     },
//   },
// };

module.exports = {
  development: {
    database: {
      host: 'localhost',
      port: '3306',
      name: 'db_sistema_venda',
      dialect: 'mysql',
      user: 'root',
      password: 'root',
    },
  },
  production: {
    database: {
      host: process.env.DB_HOST,
      host: process.env.DB_PORT,
    },
  },
};
