import React from 'react'
import parse from 'react-html-parser'
import { useSelector, useDispatch } from 'react-redux'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCardFooter,
    CCol,
    CRow
} from '@coreui/react'
import Contador from "./contador"
import { Redirect } from 'react-router-dom'
let questaoCarregada = {};
let respostaInserida = "";
let proximoID = "";
let proximaQuestao = {};
let carregado = false;

const Questao = () => {
    const dispatch = useDispatch();
    const questaoMontada = useSelector(state => state.questaoMontada);
    const respostaResolucao = useSelector(state => state.respostaResolucao);
    const questao = useSelector(state => state.questao);
    const simulado = useSelector(state => state.simulado);
    const redirecionar = useSelector(state => state.redirecionar);
    const selecionar = (letra, el) => {
        respostaInserida = letra;
        for (let e of document.getElementsByClassName("alternativas")) {
            e.classList.remove("btn-info");
            e.classList.add("btn-outline-info");
        }
        el.classList.remove("btn-outline-info");
        el.classList.add("btn-info");
    }
    const carregarQuestao = () => {
        try {
            let indices = simulado.questoes;
            let indice = indices.findIndex(element => element.id === questao.id);
            if (indice < indices.length - 1) {
                proximoID = indice + 1;
            } else {
                proximoID = "";
            }
            fetch("http://prontdoc.com.br:3001/questoes/" + questao.id).then(resp => {
                return resp.text();
            }).then(response => {
                let dados = JSON.parse(response);
                if (dados && dados[0]) {
                    dados = dados[0];
                    questaoCarregada = dados;
                    let enunciado = dados.enunciado;
                    enunciado = parse(enunciado);
                    let alternativas = [];
                    for (let a of dados.alternativas) {
                        let texto = a.texto;
                        texto = texto.replace("<div>", "").replace("</div>", "");
                        alternativas.push(<CButton className="alternativas" variant="outline" color="info" size="lg" block onClick={(e) => { selecionar(a.letra, e.currentTarget) }}><div className="float-left"><b>{a.letra} -</b>{parse(texto)}</div></CButton>);
                    }
                    let el = (
                        <>
                            <CCol>
                                <CCard >
                                    <CCardHeader color={"gradient-info"} className="text-white" >
                                        <Contador></Contador>
                                        <b>{indice + 1} de {simulado.questoes.length}</b>
                                    </CCardHeader>
                                    <CCardBody>
                                        <p><b>Questão:</b></p>
                                        {enunciado}
                                    </CCardBody>
                                    <CCardFooter>
                                        {alternativas}
                                    </CCardFooter>

                                </CCard>
                                {/* <CButton className="alternativas" color="info" onClick={anterior} style={{ display: anteriorID ? "block" : "none" }}>{"Voltar"}</CButton> */}
                                <CButton color="info" className="float-right" onClick={responder}>Responder</CButton>
                            </CCol>
                        </>);
                    dispatch({ type: "set", questaoMontada: el })
                }
            });
        } catch (err) { }
    }
    // const anterior = () => {

    // }
    const responder = (e) => {
        try {
            if (respostaInserida == "") return;
            let cloneQuestao = questao;
            let cloneSimulado = simulado;
            cloneQuestao.fim = new Date();
            cloneQuestao.resposta = respostaInserida;

            for (let e of document.getElementsByClassName("alternativas")) {
                e.disabled = true;
            }

            e.target.style.display = 'none';
            let dados = questaoCarregada;
            let alternativas = [];
            let correta = "";
            for (let a of dados.alternativas) {
                let texto = a.texto;
                texto = texto.replace("<div>", "").replace("</div>", "");
                let cor = !a.correta ? respostaInserida == a.letra ? "danger" : "secondary" : "success";
                if (a.correta) {
                    correta = a.letra;
                }
                alternativas.push(<CButton className="alternativas" variant="outline" color={cor} disabled size="lg" block ><div className="float-left"><b>{a.letra} -</b>{parse(texto)}</div></CButton>);
            }
            cloneQuestao.correta = correta;
            let indices = simulado.questoes;
            let indice = indices.findIndex(element => element.id === questao.id);
            cloneSimulado.questoes[indice] = cloneQuestao;
            proximaQuestao = simulado.questoes[proximoID];
            localStorage.setItem("simulado", JSON.stringify(cloneSimulado));

            let resolucao = "";
            let el = {};
            if (dados.resolucao) {
                resolucao = dados.resolucao;
                resolucao = parse(resolucao);
                el = (
                    <>
                        <CCol>
                            <CCard >
                                <CCardHeader color={"gradient-info"} className="text-white" >
                                    <b>Resolução:</b><br />
                                </CCardHeader>
                                <CCardBody>
                                    {resolucao}
                                </CCardBody>
                                <CCardFooter>
                                    {alternativas}
                                </CCardFooter>
                            </CCard>
                            <CButton color="info" className="float-right" onClick={proxima}>{proximoID ? "Próxima" : "Finalizar Simulado"}</CButton>
                        </CCol>
                    </>);
                dispatch({ type: "set", respostaResolucao: el, questao: cloneQuestao, simulado: cloneSimulado });
            } else {
                dispatch({ type: "set", simulado: cloneSimulado });
                proxima();
            }
            salvarSimulado();
        } catch (err) { }
    }
    const proxima = (e) => {
        if (proximoID) {
            respostaInserida = "";
            carregado = false;
            let cloneSimulado = simulado;
            proximaQuestao.inicio = new Date();
            cloneSimulado.questoes[proximoID] = proximaQuestao;
            localStorage.setItem("simulado", JSON.stringify(cloneSimulado));

            dispatch({
                type: "set",
                questao: proximaQuestao,
                respostaResolucao: false,
                questaoMontada: false,
                simulado: cloneSimulado
            });
        } else {
            dispatch({
                type: "set",
                redirecionar: (<Redirect to="/resultado" />),
                questao: {},
                carregando: false,
                questaoMontada: "",
                respostaResolucao: "",
            });
        }
    }
    const salvarSimulado = () => {
        var headers = new Headers({
            "Content-Type": "application/json"
        });

        var init = {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(simulado)
        };

        var req = new Request('http://prontdoc.com.br:3001/simulados/update', init);

        fetch(req).then(resp => {
            return resp.text();
        }).then(response => {
            let dados = JSON.parse(response);
            if (dados && dados.status !== 200) {
                console.log("Erro ao salvar simulado!", dados.message);
            }
        });
    }
    if (!questaoMontada && simulado.id) {
        carregado = true;
        carregarQuestao();
    }
    return (
        <>
            {redirecionar}
            <CCol lg="9" md="6" sm="4">{questaoMontada}</CCol>
            <CCol lg="9" md="6" sm="4">{respostaResolucao}</CCol>
        </>
    )
}
export default Questao