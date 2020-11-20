const express = require("express");

const routes = express.Router();
const QuestoesController = require("./app/controller/QuestoesController");
const SimuladosController = require("./app/controller/SimuladosController");
const Questoes = new QuestoesController();
const Simulados = new SimuladosController(Questoes);

routes.get("/questoes/:id", Questoes.getAll.bind(Questoes));

routes.post("/questoes", Questoes.insert.bind(Questoes));

routes.get("/vestibulares", Questoes.retornarListaVestibulares.bind(Questoes));

routes.post("/simulados/criar", Simulados.criarSimulado.bind(Simulados));

routes.post("/simulados/update", Simulados.salvarSimulado.bind(Simulados));

routes.post("/simulados/calcular", Simulados.calcularSimulado.bind(Simulados));

routes.get("/simulados", Simulados.retornarSimulados.bind(Simulados));

module.exports = routes;