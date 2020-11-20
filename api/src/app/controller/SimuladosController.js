const Simulados = require("../model/Simulados");

class SimuladosController {

    constructor(Questoes) {
        this.Questoes = Questoes;
    }

    /*
    body: { quantidade: Number, vestibular: string, sessao: string, username: string }
    ----------------------------
    return: { simuladoCalculado: simulado }
    */
    async criarSimulado(req, res) {
        try {
            var getId = function () {
                return "_" + Math.random().toString(36).substr(2, 9);
            };
            let dados = req.body;
            let id = getId();
            dados.id = id;
            dados.questoes = await this.Questoes.getQuestions(dados.quantidade, dados.vestibular);
            return Simulados.create(dados).then(() => {
                let resp = {
                    status: 200,
                    message: "Novo Simulado Iniciado: " + dados.sessao,
                    simulado: dados
                }
                return res.json(resp);
            });
        } catch (err) {
            return res.json({
                status: 500,
                message: "Erro: " + err
            });
        }
    }

    /*
    body: { id: String }
    ----------------------------
    return: { resultado: Resultado }
    */
    async calcularSimulado(req, res) {
        try {
            let resp = {
                status: 200,
                message: "Formulário Calculado Com Sucesso!"
            }
            let dados = req.body;
            let id = dados.id;
            let username = dados.username;
            if (id) {
                const data = await Simulados.findOne({ id: id });

                if (!data) throw new Error("Simulado não encontrado");
                data.finalizado = true;
                await data.save();
                resp.resultado = calcularAproveitamento(data);
                return res.json(resp);
            } else {
                const data = await Simulados.find({ username: username });
                resp.resultado = [];
                for (let simulado of data) {
                    resp.resultado.push(calcularAproveitamento(simulado));
                }
                return res.json(resp);
            }
        } catch (err) {
            return res.json({
                status: 500,
                message: "Erro: " + err
            });
        }
    }


    /*
    body: { simulado: String }
    ----------------------------
    return: { simuladoCalculado: simulado }
    */
    async salvarSimulado(req, res) {
        try {
            let resp = {
                status: 200,
                message: "Formulário Salvo!"
            }
            let dados = req.body;
            if (dados) {
                const data = await Simulados.findOne({ id: dados.id });

                if (!data) throw new Error("Simulado não encontrado");

                for (let prop in dados) {
                    data[prop] = dados[prop];
                }
                for (let q of data.questoes) {
                    if (q.inicio && q.fim) {
                        let res = Math.abs(new Date(q.fim) - new Date(q.inicio)) / 1000;
                        q.tempo = res;
                    }
                }
                await data.save();
                return res.json(resp);
            } else {
                throw new Error("Código da sessão inválido")

            }
        } catch (err) {
            return res.json({
                status: 500,
                message: "Erro: " + err
            });
        }
    }

    /*
    body: { username: String }
    ----------------------------
    return { simulados: [simulado] }
    */
    async retornarSimulados(req, res) {
        try {
            let resp = {
                status: 200,
                message: "Lista de simulados."
            }
            let dados = req.body;
            let username = dados.username;
            if (username) {
                const data = await Simulados.find({ username: username });
                if (!data) throw new Error("Simulados não encontrado");
                resp.simulados = data;
                return res.json(resp);
            } else {
                throw new Error("Username inválido")
            }
        } catch (err) {
            return res.json({
                status: 500,
                message: "Erro: " + err
            });
        }
    }


}


const calcularAproveitamento = (simulado) => {
    let resultado = {
        id: simulado.id,
        data: simulado.questoes[0].inicio,
        username: simulado.username,
        qtdQuestoes: simulado.quantidade,
        qtdAcertos: 0,
        tempoTotal: 0,
        tempoMedio: 0,
        aproveitamento: 0,
    };
    for (let q of simulado.questoes) {
        if (q.resposta == q.correta) {
            resultado.qtdAcertos++;
        }
        resultado.tempoTotal += q.tempo;
    }
    resultado.tempoMedio = resultado.tempoTotal / resultado.qtdQuestoes;
    resultado.aproveitamento = resultado.qtdAcertos * 100 / resultado.qtdQuestoes;
    return resultado;
}
module.exports = SimuladosController;