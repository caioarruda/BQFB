import React from 'react'
import CIcon from '@coreui/icons-react'

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Inicio',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['MENU']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Novo Simulado',
    to: '/novo',
    icon: 'cil-pencil',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Meus Simulados',
    to: '/simulados',
    icon: 'cil-options',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Sair',
    to: '/sair',
    icon: 'cil-door',
  },
]

