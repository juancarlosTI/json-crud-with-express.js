// Imports
const express = require('express');
const fs = require('fs');
const router = express.Router()

// Array de listagem de filmes
const listaDeFilmes = JSON.parse(fs.readFileSync('./src/json/movies-data.json', 'utf-8'));

// Items do JSON
// listaDeFilmes.map(item => {
//     console.log(item);
// })

// GET - Todos os filmes
router.get('/', (req, res) => {
    const queries = req.query;
    let filmes = [...listaDeFilmes];

    //console.log(req.query);

    if (Object.keys(req.query).length >= 2) {
        // Extrair as queries e utilizar todas de uma vez
        // Map nas queries? / Interpolação de string ? / O tamanho do IF será a quantidade de queries; 
        //console.log('Temos queries: ', req.query);
        // Cada chave vai realizar um procedimento - Ao final, exibir todos em uma resposta
        Object.keys(queries).forEach(query => {
            switch (query) {
                case 'sort':
                    if (queries.sort === 'releaseDate') {
                        filmes.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
                    }
                    break;
                case 'language':
                    filmes = filmes.filter(filme => filme.language == queries.language.toUpperCase());
                    break;
            } 
        });
        // Resposta com todas as queries
        res.status(200).json({
            message: "GET: 200",
            quantidadeDeFilmes: filmes.length,
            duracaoMedia: filmes.reduce((acc, filme) => acc + filme.duration, 0) / filmes.length,
            movies: filmes
        });
        return;
    }

    // Ordenação
    if (queries.sort == 'releaseDate') {
        filmes.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
        res.status(200).json({
            message: "GET: 200",
            quantidadeDeFilmes: listaDeFilmes.length,
            duracaoMedia: listaDeFilmes.reduce((acc, filme) => acc + filme.duration, 0) / listaDeFilmes.length,
            movies: queries.sort ? filmes : listaDeFilmes
        });
        return;
    }

    // Filtro de linguagem
    if (queries.language) {
        let filterLanguage = filmes.filter(filme => filme.language == language.toUpperCase());
        res.status(200).json({
            message: "GET: 200",
            quantidadeDeFilmes: listaDeFilmes.length,
            duracaoMedia: listaDeFilmes.reduce((acc, filme) => acc + filme.duration, 0) / listaDeFilmes.length,
            movies: queries.language ? filterLanguage : listaDeFilmes
        });
        return;
    }

    // Mais de um parametro na query. Ex: ?sort=releaseDate&language=br


    // GET sem query
    res.status(200).json({
        message: "GET: 200",
        quantidadeDeFilmes: listaDeFilmes.length,
        duracaoMedia: listaDeFilmes.reduce((acc, filme) => acc + filme.duration, 0) / listaDeFilmes.length,
        movies: listaDeFilmes
    });

});


module.exports = router;