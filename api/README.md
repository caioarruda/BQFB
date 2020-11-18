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

Inicializar o servidor de desenvolvimento.

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


## License
[MIT](https://choosealicense.com/licenses/mit/)
