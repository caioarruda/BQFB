import React, { lazy } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CButton,
  CRow,
  CCol,
  CCard,
  CForm,
  CCardBody,
  CCardHeader,
  CFormGroup,
  CInput,
  CLabel,
  CCardFooter,
  CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Simulado from '../simulado/simulado'

const Dashboard = () => {
  const dispatch = useDispatch();
  const autenticado = useSelector(state => state.autenticado);

  const nome = useSelector(state => state.nome);
  const username = useSelector(state => state.username);
  const autenticar = (e) => {
    e.preventDefault();
    if (nome && username) {
      dispatch({ type: 'set', autenticado: true });
      localStorage.setItem("usuario", JSON.stringify({ nome: nome, username: username }));
    }
  }
  const verificaUsuario = () => {
    try {
      let usuario = localStorage.getItem("usuario");
      if (usuario) {
        usuario = JSON.parse(usuario);
        dispatch({ type: 'set', autenticado: true, nome: usuario.nome, username: usuario.username });
      }
    } catch (err) {
      console.log("Erro ao recuperar usuário", err)
    }
  }
  verificaUsuario();
  return (
    <>
      <CRow className="d-flex justify-content-center">
        <CCol lg="6" md="4" sm="4" style={{ display: !autenticado ? "block" : "none" }} >
          <CForm onSubmit={autenticar}>
            <CCard>
              <CCardHeader color={"gradient-info"} className="text-white" >
                <b>Registrar:</b>
              </CCardHeader>
              <CCardBody>
                <CFormGroup>
                  <CLabel htmlFor="c1"  >Nome:</CLabel>
                  <CInput id="nome" required onChange={(e) => { dispatch({ type: 'set', nome: e.target.value }) }} />
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="c2" >Apelido:</CLabel>
                  <CInput id="username" required onChange={(e) => { dispatch({ type: 'set', username: e.target.value }) }} />
                </CFormGroup>
              </CCardBody>
              <CCardFooter>
                <CButton color="success" className="float-right" type="submit" >Registrar <CBadge><CIcon name="cil-save"></CIcon></CBadge></CButton>
              </CCardFooter>
            </CCard>
          </CForm>
        </CCol>
      </CRow>
      <CRow className="d-flex justify-content-center">
        <CCol lg="6" md="4" sm="4" style={{ display: autenticado ? "block" : "none" }} >
          <Simulado></Simulado>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
