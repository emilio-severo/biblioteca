const express = require('express');
const bodyParser = require('body-parser');
const conexao = require('./bd/conexao');
const Livros = require('./bd/Livros');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));
app.set("view engine", "ejs");

conexao.authenticate();

app.get("/", function(req, res){
    res.render("index");
});

app.get("/livros", function(req, res){
    Livros
        .findAll({order: ["titulo"] })
        .then(function(livros){
            res.render("livros/livros", {livros: livros});
        });
});

app.get("/livros/novo", function(req, res){
    res.render("livros/novo", {mensagem: ""});
})

app.post("/livros/salvar", function(req, res){
    let titulo = req.body.titulo;
    let autor = req.body.autor;
    let editora = req.body.editora;
    let ano = req.body.ano;
    Livros
        .create({titulo: titulo, autor: autor, editora: editora, ano: ano})
        .then( 
            res.render("livros/novo", {mensagem: "Livro incluído."}
        ));
});

app.get("/livros/editar/:id", function(req, res){
    let id = req.params.id;
    Livros
        .findByPk(id)
        .then(function(livro){
            res.render("livros/editar", {livro: livro});
        })

});

app.post("/livros/atualizar", function (req, res) {
    let id = req.body.id;
    let titulo = req.body.titulo;
    let autor = req.body.autor;
    let editora = req.body.editora;
    let ano = req.body.ano;
    Livros
        .update({ titulo: titulo, autor: autor, editora: editora, ano: ano}, { where: { id: id } })
        .then(function () {
            res.redirect("/livros");
        })
});

app.get("/livros/excluir/:id", function(req, res){
    let id = req.params.id;
    Livros
        .destroy({where: {id: id} })
        .then(function(){
            res.redirect("/livros");
        })
});

app.listen(3000);

