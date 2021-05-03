import cx from 'classnames'
import React from 'react'

import cstyles from './Common.module.css'

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cx(cstyles.inputbox, cstyles.margintopsmall)}
      {...props}
    />
  )
}
