# FB-Quest API

Projeto com objetivo de demonstrar a capacidade técnica do desenvolvedor.
link: http://prontdoc.com.br:3001/

## Instalação

Use o NPM para gestão de pacotes

```bash

cd api
npm install

```

## Uso

Inicializar o servidor de desenvolvimento.

```bash

cd api
npm run dev

```

## Endpoints

```javascript

routes.get("/questoes/:id", QuestoesController.getAll);
/*
    Retorna todas as questões.
    return body: [questoes]
*/

routes.post("/questoes", QuestoesController.insert);
/*
    Insere uma ou mais questões.
    body {questão} ou [questões]
    return status
*/

routes.get("/vestibulares", QuestoesController.retornarListaVestibulares);
/*
    Retorna os vestibulares e quantidades de questões.
    return body: { vestibular: qtd}
*/

routes.post("/simulados/criar", SimuladosController.criarSimulado);
/*
    Cria e salva um novo simulado.
    body: { quantidade: Number, vestibular: string, sessao: string, username: string }
    return: { simuladoCalculado: simulado }
*/

routes.post("/simulados/update", SimuladosController.salvarSimulado);
/*
    Salva as alterações no simulado
    body: { simulado: simulado }
    return: { status }
*/

routes.post("/simulados/calcular", SimuladosController.calcularSimulado);
/*
    Retorna o aproveitamento do Simulado e o finaliza
    body: { id: String }
    return: { resultado: Resultado }
*/

routes.get("/simulados", SimuladosController.retornarSimulados);
/*
    Retorna todos os simulados por usuario.
    body: { username: string }
    return body: [simulados]
*/

```
## Schemas

### Modelo de dados Questões 
```javascript
const QuestoesSchema = new mongoose.Schema(
    {
        "id": String,
        "materia": String,
        "vestibular": String,
        "resolucao": String,
        "enunciado": String,
        "numeroQuestao": Number,
        "ano": Number,
        "alternativas": [
            {
                "letra": String,
                "correta": Boolean,
                "texto": String
            }
        ],
        "disponivel": Boolean
    }
);
```

### Modelo de dados Simulados 
```javascript
const SimuladosSchema = new mongoose.Schema(
    {
        "sessao": String,
        "id": String,
        "username": String,
        "quantidade": Number,
        "questoes": [
            {
                "id": String,
                "inicio": Date,
                "fim": Date,
                "tempo": Number,
                "resposta": String,
                "correta": String
            }
        ],
        "finalizado": Boolean
    }
);
```

### Modelo de dados Resultados 
```javascript
    let resultado = {
        id: Number,
        data: Date,
        username: String,
        qtdQuestoes: Number,
        qtdAcertos: Number,
        tempoTotal: Number,
        tempoMedio: Number,
        aproveitamento: Number,
    };
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
