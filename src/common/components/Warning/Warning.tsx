import React from 'react'
import cn from 'classnames'

export type TWarningProps = {
  className: string
}

const Warning = ({ className }: TWarningProps): JSX.Element => {
  return (
    <div className={cn('w-full bg-red-fe flex justify-center', className)}>
      <span className='text-sm'>
        You are using a trial version of Pastel— to use all the functions,{' '}
      </span>{' '}
      <a className='ml-1 underline font-black text-sm' href='/sign-up'>
        Please Register
      </a>
    </div>
  )
}

export default Warning
