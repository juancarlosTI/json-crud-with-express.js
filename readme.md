Edição de um arquivo JSON localizado no servidor
------------------------------------------------
** Instalação **

- Abra a pasta a pasta backend e com o Terminal execute:

  npm install

- Para rodar o back-end, dentro da pasta do projeto execute:

  node --watch index.js

  (OBS: O NODE é necessário para rodar o aplicativo.)

- Para rodar o front-end, basta abrir o arquivo index.html com o navegador.


------------------------------------------------

** INTERFACE **

- Lado esquerdo: Campo de edição do corpo de uma requisição PUT;
- Lado direito: Listagem (ou visualização) de um arquivo .json que conterá todos os gêneros de filme;

- Objetivo:
    - Ser possível editar, através de uma requisição PUT, os detalhes de um gênero de filme listado no arquivo *.json.

- Validação:
    - Verificar se o 'ID' e/ou 'nome' do gênero existe na base de dados (arquivo *.json);

    Se 'ID' existe e 'nome' existe:
        - Mensagem: não existe o gênero com o id {id} ou;
        - Mensagem: O nome já está cadastrado;
        
    Se 'ID' existe e 'nome' não:
        - fazer a alteração do conteúdo (nome e/ou descrição);
    
    Se 'ID' não existe:
        - Mensagem: 'ID inválido'

------------------------------------------------

- Uso do app
    - Para alterar o registro, é necessário o ID do gênero;
    - Para alterar o nome, basta o ID;
    - Descrição opcional;
    - Só é possível alterar os registros que já existem (não podem ser alterados registros com ID's inválidos);

    - O corpo da requisição tem a estrutura:
    {
        "id": X,
        "nome": Y,
        "descrição": Z 
    }

    onde:
        - X: id (identificador do registro);
        - Y: nome de um gênero de filme;
        - Z: descrição do gênero;

    - Um botão "enviar" realiza a validação. Se válido, a requisição é enviada para a API e a tela atualizada.



    BUGS

    - A página é atualizada quando a requisição tem status(200). 
    - No back-end aparece um erro de envio de headers, porque quando o arquivo é salvo, o servidor atualiza o front-end antes de enviar o status(200).