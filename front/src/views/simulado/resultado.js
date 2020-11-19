import React from 'react'

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
import CIcon from '@coreui/icons-react';
import { Redirect } from 'react-router-dom';

let carregado = false;
const Resultado = () => {

    const formataSegundos = (res) => {
        let horas = Math.floor(res / 3600) % 24;
        let minutos = Math.floor(res / 60) % 60;
        var segundos = res % 60;
        return horas.toFixed(0).toString().padStart(2, '0') + ":" + minutos.toFixed(0).toString().padStart(2, '0') + ":" + segundos.toFixed(0).toString().padStart(2, '0');
    }

    const dispatch = useDispatch();
    const simulado = useSelector(state => state.simulado);
    const resultado = useSelector(state => state.resultado);

    const retornarResultado = () => {
        let simuladoAux = simulado;
        if (!simulado.id) {
            simuladoAux = localStorage.getItem("simulado");
            simuladoAux = JSON.parse(simuladoAux);
        }
        if (simuladoAux && simuladoAux.id) {
            var headers = new Headers({
                "Content-Type": "application/json"
            });
            var init = {
                method: 'POST',
                headers: headers,
                mode: 'cors',
                cache: 'default',
                body: JSON.stringify({ id: simuladoAux.id })
            };

            var req = new Request('http://prontdoc.com.br:3001/simulados/calcular', init);

            fetch(req).then(resp => {
                return resp.text();
            }).then(response => {
                let dados = JSON.parse(response);
                if (dados && dados.status === 200, dados.resultado) {
                    carregado = true;
                    let res = dados.resultado;
                    let icon = (<CIcon size={'6xl'} name="cil-check-circle" className="text-success"></CIcon>);
                    if (res.aproveitamento < 50) {
                        icon = (<CIcon size={'6xl'} name="cil-x-circle" className="text-danger" ></CIcon>);
                    }
                    let resposta = (
                        <>
                            <CCol>{icon}</CCol>
                            <CCol>
                                <p> Tempo: {formataSegundos(res.tempoTotal)}</p>
                                <p> Média: {formataSegundos(res.tempoMedio)}</p>
                                <p> Nº de Questões: {res.qtdQuestoes}</p>
                                <p> Nº de Acertos: {res.qtdAcertos}</p>
                                <p> Aproveitamento: {res.aproveitamento.toFixed(2)}%</p>
                            </CCol>
                        </>
                    );
                    carregado = false;
                    dispatch({
                        type: "set",
                        resultado: resposta,
                        questao: {},
                        carregando: false,
                        redirecionar: false,
                        questaoMontada: "",
                        simulado: false,
                        vestibulares: false,
                    })
                }
            });
        } else {
            dispatch({ type: "set", resultado: (<Redirect to="/" />) })
        }
    }
    if (!carregado && !resultado) {
        retornarResultado();
    }
    return (
        <>
            <CRow className="d-flex justify-content-center">
                <CCol lg="6" md="4" sm="4" >
                    <CCard  >
                        <CCardHeader color={"gradient-info"} className="text-white">
                            <b>Resultado:</b>
                        </CCardHeader>
                        <CCardBody className="d-flex justify-content-center" >
                            {resultado}
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Resultado