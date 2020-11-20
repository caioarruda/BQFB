const Questoes = require("../model/Questoes");

class QuestoesController {
    async insert(req, res) {
        try {
            let resp = {
                status: 200,
                message: "1 nova questão foi inserida!"
            }
            // const fs = require('fs');
            // let rawdata = fs.readFileSync(__dirname + "/../../all.json");
            // let obj = JSON.parse(rawdata);
            let obj = req.body;
            if (Array.isArray(obj)) {
                for (let q of obj) {
                    await Questoes.create(q);
                }
                resp.message = obj.length + " novas questões foram inseridas";
            } else {
                await Questoes.create(req.body);
            }
            return res.json(resp);
        }
        catch (err) {
            return res.json({
                status: 500,
                message: "Erro: " + err
            });
        }
    }

    async getAll(req, res) {
        let filtro = { disponivel: true };
        if (req.params && req.params.id) {
            filtro.id = req.params.id;
        }
        const data = await Questoes.find(filtro);
        return res.json(data);
    }

    async getQuestionById(req, res) {
        const data = Questoes.findOne({ id: req.body.id });
        return res.json(data);
    }

    async retornarListaVestibulares(req, res) {
        const data = await Questoes.aggregate([{
            $match: { disponivel: true }
        }, {
            $group: { _id: "$vestibular", count: { $sum: 1 } }
        }]);
        let vestibulares = {}
        for (let v of data) {
            vestibulares[v._id] = v.count;
        }
        let resp = {
            status: 200,
            message: "Lista dos Vestibulares",
            vestibulares: vestibulares
        }
        return res.json(resp);
    }

    async getQuestions(qtd, vestibular) {
        let pesquisa = [];
        for (let i = 0; i < qtd; i++) {
            let questao = await Questoes.findOne({ vestibular: vestibular, disponivel: true }, { id: 1 }, { skip: i });
            let questaoAux = {
                "id": questao.id,
                "inicio": null,
                "fim": null,
                "tempo": 0,
                "resposta": ""
            };

            pesquisa.push(questaoAux);
        }
        return pesquisa;
    }
}



module.exports = QuestoesController;