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
const Simulados = () => {
    const formataData = (ndate) => {
        let now = new Date();
        if (ndate) {
            now = ndate;
        }
        let year = "" + now.getFullYear();
        let month = "" + (now.getMonth() + 1);
        if (month.length === 1) {
            month = "0" + month;
        }
        let day = "" + now.getDate();
        if (day.length === 1) {
            day = "0" + day;
        }
        let hour = "" + now.getHours();
        if (hour.length === 1) {
            hour = "0" + hour;
        }
        let minute = "" + now.getMinutes();
        if (minute.length === 1) {
            minute = "0" + minute;
        }
        let second = "" + now.getSeconds();
        if (second.length === 1) {
            second = "0" + second;
        }
        return day + "/" + month + "/" + year + " " + hour + ":" + minute;
    };
    const formataSegundos = (res) => {
        let horas = Math.floor(res / 3600) % 24;
        let minutos = Math.floor(res / 60) % 60;
        var segundos = res % 60;
        return horas.toFixed(0).toString().padStart(2, '0') + ":" + minutos.toFixed(0).toString().padStart(2, '0') + ":" + segundos.toFixed(0).toString().padStart(2, '0');
    }

    const dispatch = useDispatch();
    const resultados = useSelector(state => state.resultados);

    const retornarResultado = () => {
        let username = localStorage.getItem("usuario");
        username = JSON.parse(username);
        if (!username || !username.username) {
            return;
        }
        username = username.username;
        var headers = new Headers({
            "Content-Type": "application/json"
        });
        var init = {
            method: 'POST',
            headers: headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify({ username: username })
        };

        var req = new Request('http://localhost:3001/simulados/calcular', init);

        fetch(req).then(resp => {
            return resp.text();
        }).then(response => {
            let dados = JSON.parse(response);
            if (dados && dados.status === 200, dados.resultado) {
                carregado = true;
                let todos = [];
                for (let res of dados.resultado) {
                    let data = formataData(new Date(res.data));
                    let icon = (<CIcon size={'6xl'} name="cil-check-circle" className="text-white"></CIcon>);
                    if (res.aproveitamento < 50) {
                        icon = (<CIcon size={'6xl'} name="cil-x-circle" className="text-danger" ></CIcon>);
                    }
                    let resposta = (
                        <>
                            <CCol lg="6" md="4" sm="4" >
                                <CCard color={"gradient-info"} className="text-white">
                                    <CCardHeader  >
                                        <b>Resultado: {data}</b>
                                    </CCardHeader>
                                    <CCardBody className="d-flex justify-content-center" >
                                        <CCol>{icon}</CCol>
                                        <CCol>
                                            <p> Tempo: {formataSegundos(res.tempoTotal)}</p>
                                            <p> Média: {formataSegundos(res.tempoMedio)}</p>
                                            <p> Nº de Questões: {res.qtdQuestoes}</p>
                                            <p> Nº de Acertos: {res.qtdAcertos}</p>
                                            <p> Aproveitamento: {res.aproveitamento.toFixed(2)}</p>
                                        </CCol>
                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </>
                    );
                    todos.push(resposta);
                }
                dispatch({
                    type: "set",
                    resultados: todos,
                    questao: false,
                    carregando: false,
                    redirecionar: false,
                    questaoMontada: "",
                    simulado: false,
                    vestibulares: false,
                })
            }
        });
    }
    if (!carregado && !resultados) {
        retornarResultado();
    }
    return (
        <>
            <CRow className="d-flex justify-content-center">
                {resultados}
            </CRow>
        </>
    )
}

export default Simulados