const MockModel = require("jest-mongoose-mock");
jest.mock("../app/model/Simulados", () => new MockModel());
jest.mock("../app/model/Questoes", () => new MockModel());
const SimuladosModel = require("../app/model/Simulados");
const QuestoesModel = require("../app/model/Questoes");
const QuestoesController = require("../app/controller/QuestoesController");
const SimuladosController = require("../app/controller/SimuladosController");
const Questoes = new QuestoesController();
const Simulados = new SimuladosController(Questoes);
const server = require("../server.js");
const request = require("supertest");

QuestoesModel._setMockData(
    [{
        "id": "35ea71e3db51d509bfcfcae52",
        "alternativas": [
            {
                "letra": "A",
                "correta": false,
                "texto": "<div>&nbsp;hoje.&nbsp;</div>"
            },
            {
                "letra": "B",
                "correta": false,
                "texto": "<div>&nbsp;senão.&nbsp;</div>"
            },
            {
                "letra": "C",
                "correta": false,
                "texto": "<div>&nbsp;porém.&nbsp;</div>"
            },
            {
                "letra": "D",
                "correta": false,
                "texto": "<div>&nbsp;logo.&nbsp;</div>"
            },
            {
                "letra": "E",
                "correta": true,
                "texto": "<div>&nbsp;ainda.&nbsp;</div>"
            }
        ],
        "vestibular": "ENEM",
        "materia": "Espanhol",
        "ano": 2018,
        "numeroQuestao": 5,
        "resolucao": "",
        "enuciado": "",
        "disponivel": true
    },
    {
        "id": "35ea71e3db51d509bfcfcae52",
        "alternativas": [
            {
                "letra": "A",
                "correta": false,
                "texto": "<div>&nbsp;hoje.&nbsp;</div>"
            },
            {
                "letra": "B",
                "correta": false,
                "texto": "<div>&nbsp;senão.&nbsp;</div>"
            },
            {
                "letra": "C",
                "correta": false,
                "texto": "<div>&nbsp;porém.&nbsp;</div>"
            },
            {
                "letra": "D",
                "correta": false,
                "texto": "<div>&nbsp;logo.&nbsp;</div>"
            },
            {
                "letra": "E",
                "correta": true,
                "texto": "<div>&nbsp;ainda.&nbsp;</div>"
            }
        ],
        "vestibular": "ENEM",
        "materia": "Espanhol",
        "ano": 2018,
        "numeroQuestao": 5,
        "resolucao": "",
        "enuciado": "",
        "disponivel": true
    },
    ]);

describe("SimuladosController", () => {
    let req, res;
    req = {
        body: {
            quantidade: 25,
            vestibular: "ENEM",
            sessao: "teste"
        }
    };
    res = { json: jest.fn() };
    beforeEach(() => {
        jest.clearAllMocks();  //reset mock calls

    })
    it('GET /Criar Simulado', function (done) {
        const callback1 = () => {
            console.log(SimuladosModel.create.mock.calls.length);
            expect(SimuladosModel.create.mock.calls.length).toBeGreaterThan(0)
        };
        Simulados.criarSimulado(req, res).then(() => { callback1() });
    });
});


describe('routes', function () {
    it('GET /vestibulares', function (done) {
        request(server).get('/vestibulares')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function () {
                done();
            });
    });
});

describe('routes', function () {
    it('GET /questoes', function (done) {
        request(server).get('/questoes')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, function () {
                done();
            });
    });
});
