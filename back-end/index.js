// Import
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const routes = require('./endpoints');
const movies = require('./movies');

// Inicialização
const app = express();

// Middleware (para permitir acesso de varias origens)
app.use(cors());
// Middleware (para permitir o tratamento das requisições em formato JSON);
app.use(express.json())
// EndPoints
app.use('/gender', routes);
// Listagem de filmes
app.use('/movies', movies);
// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor em execução na porta http://localhost:3000/');
})

module.exports = app;


// Deve ser um arquivo .json;
// Deve ser verificado se o campo de "nome" está preenchido. (. Se nenhum campo for preenchido, retornar mensagem fazendo a requisição de pelo menos, o nome. ID Obrigatório