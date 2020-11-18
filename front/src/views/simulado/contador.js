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
import { cilArrowThickBottom } from '@coreui/icons';


const diferencaDatas = (inicio, fim) => {
    let res = Math.abs(fim - inicio) / 1000;
    let horas = Math.floor(res / 3600) % 24;
    let minutos = Math.floor(res / 60) % 60;
    var segundos = res % 60;
    return horas.toFixed(0).toString().padStart(2, '0') + ":" + minutos.toFixed(0).toString().padStart(2, '0') + ":" + segundos.toFixed(0).toString().padStart(2, '0');
}
let timer;
const Contador = () => {
    const dispatch = useDispatch();
    const questao = useSelector(state => state.questao);
    const tempo = useSelector(state => state.tempo);
    const tick = () => {
        let time = diferencaDatas(new Date(questao.inicio), questao.fim ? new Date(questao.fim) : new Date());
        dispatch({ type: "set", tempo: time })
    }
    setTimeout(tick, 1000);
    return (
        <>
            <b>Tempo: {tempo}</b><br />
        </>
    )
}

export default Contador