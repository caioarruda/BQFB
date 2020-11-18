import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="http://prontdoc.com.br/simulado" target="_blank" rel="noopener noreferrer">BQ</a>
        <span className="ml-1">&copy; 2020 PRONTDOC.com.br</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="http://prontdoc.com.br" target="_blank" rel="noopener noreferrer">PRONTDOC.com.br</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
