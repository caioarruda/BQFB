const express = require("express");

const routes = express.Router();
const QuestoesController = require("./app/controller/QuestoesController");
const SimuladosController = require("./app/controller/SimuladosController");

routes.get("/questoes/:id", QuestoesController.getAll);

routes.post("/questoes", QuestoesController.insert);

routes.get("/vestibulares", QuestoesController.retornarListaVestibulares);

routes.post("/simulados/criar", SimuladosController.criarSimulado);

routes.post("/simulados/update", SimuladosController.salvarSimulado);

routes.post("/simulados/calcular", SimuladosController.calcularSimulado);

routes.get("/simulados", SimuladosController.retornarSimulados);

module.exports = routes;