# API

API desenvolvida para permitir o cadastro e atualização do valor de moedas(USD, ARS) em real(BRL).

## Como usar

Use o gerenciador de pacotes [npm](https://www.npmjs.com/) para instalar as dependências.

Altere o nome do arquivo .env.example para .env e informe a string de conexão para um banco de dados Mongo na variável MONGODB_CONNECTION_STRING.

Para iniciar a aplicação execute:

```bash
npm install
npm start
```

ou com [Docker](https://www.docker.com/):
```bash
docker-compose up
```