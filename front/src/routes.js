import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Sair = React.lazy(() => import("./views/pages/login/Sair"));
const Resultado = React.lazy(() => import("./views/simulado/resultado"));
const Simulados = React.lazy(() => import("./views/simulado/simulados"));

const routes = [
  { path: '/', name: 'Novo Simulado' },
  { path: '/dashboard', name: 'Novo Simulado', component: Dashboard },
  { path: '/sair', exact: true, name: 'Sair', component: Sair },
  { path: '/resultado', exact: true, name: 'Resultado', component: Resultado },
  { path: '/simulados', exact: true, name: 'Simulados', component: Simulados },
];

export default routes;
