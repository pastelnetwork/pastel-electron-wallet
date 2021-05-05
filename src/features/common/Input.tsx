import cx from 'classnames'
import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'

import cstyles from './Common.module.css'

function _Input(
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      className={cx(cstyles.inputbox, cstyles.margintopsmall)}
      {...props}
    />
  )
}

export const Input = forwardRef(_Input)
