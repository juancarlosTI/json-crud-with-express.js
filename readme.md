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

- Lado esquerdo: Campo de edição do corpo de uma requisição;
- Lado direito: Listagem (ou visualização) de um arquivo .json que conterá todos os gêneros de filme;

- Objetivo:
    - Funções CRUD, que modificam/criam os detalhes de um gênero de filme listado no arquivo *.json.

- Validação:
    - Verificar se o 'ID' e/ou 'nome' do gênero existe na base de dados (arquivo *.json);

    Se 'nome' existe:
        - Mensagem: "Erro - Nome já existe no arquivo.";
        
    Se 'ID' existe e 'nome' não:
        - Mensagem: "Erro - Preencha os campos obrigatórios - nome e Id";
    
    Se 'ID' existe:
        - Mensagem: "ID excedeu o tamanho da lista ou é inválido."

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
  
    - No back-end aparece um erro de envio de headers, porque quando o arquivo JSON é salvo, o servidor atualiza o front-end antes de enviar o status(200).
