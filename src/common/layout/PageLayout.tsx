import React from 'react'
import Navbar from '../components/Header'

const PageLayout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  )
}

export default PageLayout
