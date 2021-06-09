import React from 'react'
import Navbar from '../components/Header'

const PageLayout: React.FC = ({ children }) => {
  return (
    <div className='w-screen h-screen'>
      <Navbar />
      <div className='routes-wrapper bg-background-main'>{children}</div>
    </div>
  )
}

export default PageLayout
