// Import
const fs = require('fs');
const express = require('express');
const cors = require('cors');

// Inicialização
const app = express();

// Middleware (para permitir acesso de varias origens)
app.use(cors());
// Middleware (para permitir o tratamento das requisições em formato JSON);
app.use(express.json())

// Array de gêneros de filmes
const genero = JSON.parse(fs.readFileSync('./src/json/data.json', 'utf-8'));

// Items do JSON
genero.map(item => {
    console.log(item);
})

// GET
app.get('/gender', (req, res) => {
    res.status(200).json({
        message: "GET: 200",
        genders: genero
    });
});

// POST
app.post('/gender', (req, res) => {
    // O post verificará se o id e o nome já existem no arquivo JSON
    if (req.body.nome === "" || req.body.id === "") {
        res.status(409).json({
            message: 'Erro - Preencha os campos obrigatórios - nome e Id'
        })
    }

    // Salva o valor do ID em uma variável
    const validationId = parseInt(req.body.id);

    // console.log(!genero.some(item => item && item.id == validationId));

    try {
        // Verificar se existe algum item com o id igual o input
        if (!genero.some(item => item && item.id == validationId)) {
            console.log('Entrei no if')
            console.log()
            // Verificar se existe um gênero com o nome igual o da requisição;
            const nomeExistente = genero.some(item => item && item.nome === req.body.nome);

            if (nomeExistente) {
                return res.status(409).json({
                    message: 'Erro - Nome já existe no arquivo.'
                });
            }

            console.log('Passou na validação');

            // Escrever JSON utilizando o FS
            genero.push(req.body);
            res.status(200).json({
                message: 'Dados foram registrados!',
                data: genero[genero.length - 1]
            });
            JSON.parse(fs.writeFileSync('./src/json/data.json', JSON.stringify(genero, null, 2), 'utf-8'));
            return;

            // Passou na validação - Pode escrever o POST
            // console.log(req.body);
        } else {
            return res.status(404).json({
                message: 'ID excedeu o tamanho da lista ou é inválido.'
            });
        }
    } catch (err) {
        console.error('Erro: ', err.message);
        if (!res.headersSent) {
            res.status(500).json({ message: "Erro no cabecalho " , error: err.message });
        }
        res.status(500).json({
            message: 'Aconteceu um erro no servidor!',
        });
        
    }

})

// PUT
app.put('/gender/:id', (req, res) => {
    // Salva o valor do ID em uma variável
    const validationId = parseInt(req.params.id);
    // Verifica se o nome foi preenchido
    if (!req.body.nome) {
        res.status(409).json({
            message: 'Erro - Nome Obrigatório.'
        })
    }

    try {
        // Requisição do input dos novos dados - Dados do frontend.
        // Formato do input - json . Atributos: id, nome, descricao.
        // Verificação dos campos alterados. Caso só tenha alterado uma propriedade, mantêr as outras propriedades.

        // ID NUNCA MUDA, somente nome e descrição.

        // Validação da ID
        // Verificar se existe algum item com o id igual o input
        if (!genero.some(item => item && item.id == validationId)) {
            res.status(404).json({
                message: 'ID excedeu o tamanho da lista ou é inválido.',
                data: []
            });
        } else {
            console.log('Validação: ', req.params.id, '\nReq:', req.body);

            // Verificar se existe um gênero com o nome igual o da requisição;
            genero.map(item => {
                if (req.body.nome == item.nome) {
                    res.status(409).json({
                        message: 'Erro - Nome já existe no arquivo.'
                    });
                } else {
                    console.log('Passou na verificação');
                }
            });

            // Escrever JSON utilizando o FS

            const alterarId = genero.find(genero => genero.id == validationId);
            if (alterarId){
                alterarId.nome = req.body.nome
                alterarId.descricao = req.body.descricao
                res.status(200).json({
                    message: 'Dados foram registrados!',
                    data : genero[genero.length - 1]
                });
                JSON.parse(fs.writeFileSync('./src/json/data.json', JSON.stringify(genero, null, 2), 'utf-8'));
                return;
            }
        }
    } catch (err) {
        console.error('Erro: ', err.message);
        if (!res.headersSent) {
            res.status(400).json({ message: "Erro no envio do cabecalho " + err.message });
        }
        res.status(500).json({
            message: 'Aconteceu um erro no servidor!',
        });
        
    }
})

// DELETE
app.delete('/gender/:id', (req, res) => {
    if (!req.params.id) {
        res.status(409).json({
            message: 'Erro - Preencha os campos obrigatórios - Id'
        })
    }

    const validationId = parseInt(req.params.id);
    try {
        if (genero.some(item => item.id == validationId)) {
            // Achar o id - excluir o ID
            const novoJson = genero.filter(item => item.id != validationId);
            res.status(200).json({
                message: `Removido - ID :${validationId}`,
            })
            genero.length = 0
            genero.push(...novoJson);
            console.log(genero);

            JSON.parse(fs.writeFileSync('./src/json/data.json', JSON.stringify(novoJson, null, 2), 'utf-8'));
            return;
        } else {
            res.status(404).json({
                message: 'ID inválido.',
                data: []
            });
        }

    } catch (err) {
        console.error('Erro: ', err.message);
        if (!res.headersSent) {
            res.status(400).json({ message: "Erro no cabecalho " + err.message });
        }
        res.status(500).json({
            message: 'Aconteceu um erro no servidor!',
        });
    }
})

app.listen(3000, () => {
    console.log('Servidor em execução na porta http://localhost:3000/');
})




// Deve ser um arquivo .json;
// Deve ser verificado se o campo de "nome" está preenchido. (. Se nenhum campo for preenchido, retornar mensagem fazendo a requisição de pelo menos, o nome. ID Obrigatório