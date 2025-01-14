// Import
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./endpoints');
const movies = require('./movies');
const port = process.env.PORT || 3000;

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
// Middleware para servir arquivos estáticos (frontend)
//app.use(express.static(path.join(__dirname, '../front-end')));


// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor em execução na porta http://localhost:${port}/`);
})

module.exports = app;


// Deve ser um arquivo .json;
// Deve ser verificado se o campo de "nome" está preenchido. (. Se nenhum campo for preenchido, retornar mensagem fazendo a requisição de pelo menos, o nome. ID Obrigatório