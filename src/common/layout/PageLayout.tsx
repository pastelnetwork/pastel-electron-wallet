import React from 'react'
import cn from 'classnames'

import Header from '../components/Header'
import PastelUtils from 'common/utils/utils'

const PageLayout: React.FC = ({ children }) => {
  return (
    <div className='w-screen h-screen'>
      <Header />
      <div
        className={cn(
          'bg-background-main overflow-y-auto',
          PastelUtils.noHeader() ? 'h-screen' : 'routes-wrapper',
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default PageLayout
