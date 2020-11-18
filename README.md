# FB-Quest

Projeto com objetivo de demonstrar a capacidade técnica do desenvolvedor.

## Pré-Requisito

1. Instalado o MongoDB
2. Configurar a conexão com o banco.
   Caminho: api/src/database/config.js
Exemplo:
```javascript
module.exports = {
    uri: "mongodb://SEU_URL:27017/bq"
};
```

## Instalação

Use o NPM para gestão de pacotes

```bash

cd api
npm install
cd ../front
npm Install

```

## Uso

Inicializar o servidor de desenvolvimento da API. Porta 3001.

```bash

cd api
npm run dev

```

Inicializar o servidor de desenvolvimento do Frontend. Porta 3000.

```bash

cd front
npm start

```

## License
[MIT](https://choosealicense.com/licenses/mit/)
