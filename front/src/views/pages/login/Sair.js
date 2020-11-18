import React from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'



const Sair = () => {
    localStorage.removeItem("simulado");
    localStorage.removeItem("usuario");
    const dispatch = useDispatch();
    dispatch({
        type: "set",
        username: true,
        questao: false,
        simulado: false,
        carregado: false,
        criando: false,
        autenticado: false,
        resultado: false,
        redireciona: false,
        questaoMontada: false,
        respostaResolucao: false,
        vestibulares: false,
    });
    return (<Redirect to="/" />);
}

export default Sair
