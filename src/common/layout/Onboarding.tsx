import React, { ReactNode } from 'react'

function OnboardingLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <div className='opacity-100 rounded-xl bg-white shadow-xl relative overflow-hidden max-w-9/10 max-h-9/10'>
      {children}
    </div>
  )
}

export default OnboardingLayout
