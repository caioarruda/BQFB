import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    CButton,
    CCard,
    CForm,
    CCardBody,
    CCardHeader,
    CFormGroup,
    CInput,
    CLabel,
    CCardFooter,
    CBadge,
    CSelect,
    CRow
} from '@coreui/react'
import Questao from "./questao"
import CIcon from '@coreui/icons-react'

let carregado = false;

const Simulado = () => {
    const dispatch = useDispatch();
    const carregando = useSelector(state => state.carregando);
    const username = useSelector(state => state.username);
    const simulado = useSelector(state => state.simulado);
    const criando = useSelector(state => state.criando);
    const vestibulares = useSelector(state => state.vestibulares);
    let maximo = 1;
    let vestibular = "";
    let quantidade = 0;
    const criar = (e) => {
        try {
            e.preventDefault();
            if (quantidade && vestibular) {
                dispatch({ type: "set", criando: true });
                var getId = function () {
                    return "_" + Math.random().toString(36).substr(2, 9);
                };
                let sessao = getId();
                var headers = new Headers({
                    "Content-Type": "application/json"
                });

                var init = {
                    method: 'POST',
                    headers: headers,
                    mode: 'cors',
                    cache: 'default',
                    body: JSON.stringify({
                        sessao: sessao,
                        username: username,
                        quantidade: quantidade,
                        vestibular: vestibular
                    })
                };

                var req = new Request('http://prontdoc.com.br:3001/simulados/criar', init);

                fetch(req).then(resp => {
                    return resp.text();
                }).then(response => {
                    let dados = JSON.parse(response);
                    if (dados && dados.status === 200 && dados.simulado && dados.simulado.questoes) {
                        preencherSimulado(dados.simulado, true);
                        localStorage.setItem("simulado", JSON.stringify(dados.simulado));
                    }
                    dispatch({ type: "set", criando: false });
                });
            }
        } catch (err) {
            console.log(err);
            dispatch({ type: "set", criando: false });
        }
    }

    const carregarVestibulares = () => {
        try {
            carregado = true;
            fetch("http://prontdoc.com.br:3001/vestibulares").then(resp => {
                return resp.text();
            }).then(response => {
                let dados = JSON.parse(response);
                if (dados && dados.status === 200 && dados.vestibulares) {
                    let lista = document.getElementById("vestibulares");

                    for (let v in dados.vestibulares) {
                        let qtd = dados.vestibulares[v];
                        let option = document.createElement("option"); //"<option value=\"" + v + "\"}>" + v + "</option>";
                        option.text = v + " (" + qtd + " questões)";
                        option.value = qtd;
                        if (lista) {
                            lista.appendChild(option);
                        }
                    }
                }
                dispatch({ type: 'set', carregando: false, vestibulares: true });
            });
        }
        catch (err) {
        }
    }
    const definirMaximo = (max) => {
        maximo = max;
        let el = document.getElementById("quantidade");
        el.setAttribute("max", max.toString());
        el.value = max;
        quantidade = max;
    }
    const preencherSimulado = (simuladoAux, novo) => {
        for (let q in simuladoAux.questoes) {
            q = simuladoAux.questoes[q];
            if (!q.fim) {
                if (novo) {
                    q.inicio = new Date();
                    simuladoAux.questoes[q.id] = q;
                    carregado = false;
                }
                if (q.inicio) {
                    carregado = false;
                    dispatch({
                        type: "set",
                        criando: false,
                        simulado: simuladoAux,
                        questao: q
                    });

                    break;
                }
            }
        }
    }
    const verificaSimuladoAberto = () => {
        let simuladoStorage = localStorage.getItem("simulado");
        simuladoStorage = JSON.parse(simuladoStorage);
        if (simuladoStorage && !simulado.id && vestibulares) {
            preencherSimulado(simuladoStorage);

        }
        if (!vestibulares && username) {
            carregarVestibulares();
        }
    }

    verificaSimuladoAberto();

    return (
        <>
            <CForm onSubmit={criar} style={{ display: !criando && !simulado.id ? "block" : "none" }}>
                <CCard>
                    <CCardHeader color={"gradient-info"} className="text-white" >
                        <b>Criar Simulado:</b>
                    </CCardHeader>
                    <CCardBody>
                        <CFormGroup>
                            <CLabel htmlFor="c2" >Selecione o Vestibular:</CLabel>
                            <CSelect id="vestibulares" required onChange={(e) => {
                                vestibular = e.target.selectedOptions[0].text;
                                vestibular = vestibular.split("(")[0].trim();
                                definirMaximo(e.target.value);
                            }} custom placeholder="Selecione o Vestibular" style={{ display: !vestibulares ? 'none' : 'block' }}>
                                <option disabled selected value> Selecione... </option>
                            </CSelect>
                            <CLabel style={{ display: vestibulares ? 'none' : 'block' }}>Carregando Lista de Vestibulares</CLabel>
                        </CFormGroup>
                        <CFormGroup onSubmit={criar}>
                            <CLabel htmlFor="c1"  >Quantidade de Questões:</CLabel>
                            <CInput id="quantidade" type="number" min="1" max="1" required onChange={(e) => {
                                quantidade = parseInt(e.target.value) > parseInt(maximo) ? maximo : e.target.value;
                                if (quantidade !== e.target.value) {
                                    e.target.value = quantidade;
                                }
                            }} />
                        </CFormGroup>

                    </CCardBody>
                    <CCardFooter>
                        <CButton color="info" className="float-right" type="submit" disabled={carregando}>Criar<CBadge><CIcon name="cil-save"></CIcon></CBadge></CButton>
                    </CCardFooter>
                </CCard>
            </CForm>
            <CCard color={"gradient-info"} style={{ display: criando ? "block" : "none" }} className="text-white">
                <CCardBody>
                    <h5>Criando Simulado...</h5>
                </CCardBody>
            </CCard>
            <CRow style={{ paddingBottom: "50px" }}>
                <Questao></Questao>
            </CRow>
        </>
    )
}

export default Simulado
