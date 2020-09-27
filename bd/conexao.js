const Sequelize = require('sequelize');

const conexao = new Sequelize('bibliotecabd', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = conexao;

