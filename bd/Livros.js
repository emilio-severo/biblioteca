const Sequelize = require('sequelize');
const conexao = require('./conexao');

const Livros = conexao.define('livros', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: Sequelize.STRING,
    autor: Sequelize.STRING,
    editora: Sequelize.STRING,
    ano: Sequelize.INTEGER
});

Livros.sync({force: false});

module.exports = Livros;

