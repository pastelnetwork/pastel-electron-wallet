import React, { ReactNode } from 'react'

import Header from '../components/Header'

function PageLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className='w-screen h-screen overflow-y-auto m-0'>
      <Header />
      <div className='bg-background-main'>{children}</div>
    </div>
  )
}

export default PageLayout
