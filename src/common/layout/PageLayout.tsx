import React from 'react'

import Header from '../components/Header'

const PageLayout: React.FC = ({ children }) => {
  return (
    <div className='w-screen h-screen overflow-y-auto m-0'>
      <Header />
      <div className='bg-background-main'>{children}</div>
    </div>
  )
}

export default PageLayout
