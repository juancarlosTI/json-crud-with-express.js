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
genero.genero.map(item => {
    console.log(item);
})

// Get array de gênero pelo nome
app.get('/gender', (req, res) => {
    res.status(200).json({
        message: "GET: 200",
        genders: genero.genero
    });
});

// PUT
// Quando o put ser executado, vai falhar porque o get está usando um nome que vai ser alterado, logo após a alteração, o nome atual deixa de ser válido pois não existe.
app.put('/gender/:id', (req, res) => {
    // Salva o valor do ID em uma variável
    const validationId = parseInt(req.params.id);
    // Verifica se o nome foi preenchido
    if (!req.body.nome){
        throw new Error(res.status(409).json({
            message: 'Erro - Nome Obrigatório.'
        }))    
    }

    try {
        // Requisição do input dos novos dados - Dados do frontend.
        // Formato do input - json . Atributos: id, nome, descricao.
        // Verificação dos campos alterados. Caso só tenha alterado uma propriedade, mantêr as outras propriedades.

        // ID NUNCA MUDA, somente nome e descrição.

        // Validação da ID
        if (validationId <= genero.genero.length - 1) {
            console.log('Validação: ', req.params.id, '\nReq:', req.body);

            // Verificar se existe um gênero com o nome igual o da requisição;
            genero.genero.map(item => {
                if (req.body.nome == item.nome) {
                    throw new Error(res.status(409).json({
                        message: 'Erro - Nome já existe no arquivo.'
                    }));
                } else {
                    console.log('Passou na verificação');
                }
            });

            // Escrever JSON utilizando o FS
            genero.genero[validationId] = req.body;
            res.status(200).json({
                message: 'Dados foram registrados!',
                data: genero.genero[validationId]
            });
            JSON.parse(fs.writeFileSync('./src/json/data.json', JSON.stringify(genero, null, 2), 'utf-8'));
            return;

        } else {
            res.status(404).json({
                message: 'ID excedeu o tamanho da lista ou é inválido.',
                data: []
            });
            throw new Error('ID excedeu o tamanho da lista ou é inválido.');
        }
    } catch (err) {
        if (!res.headersSent){
            res.status(400).json({ message: "Erro no cabecalho " + err.message });
        }
        res.status(500).json({
            message: 'Aconteceu um erro no servidor!',
        });
        console.error('Erro: ', err.message);
    }
})

app.listen(3000, () => {
    console.log('Servidor em execução na porta http://localhost:3000/');
})




// Deve ser um arquivo .json;
// Deve ser verificado se o campo de "nome" está preenchido. (. Se nenhum campo for preenchido, retornar mensagem fazendo a requisição de pelo menos, o nome. ID Obrigatório