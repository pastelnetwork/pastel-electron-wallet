import React from 'react'
import Header from '../components/Header'

const PageLayout: React.FC = ({ children }) => {
  return (
    <div className='w-screen h-screen'>
      <Header />
      <div className='routes-wrapper bg-background-main'>{children}</div>
    </div>
  )
}

export default PageLayout
