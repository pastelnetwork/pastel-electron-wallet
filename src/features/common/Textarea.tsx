import cx from 'classnames'
import React, { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react'

import cstyles from './Common.module.css'

function _Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  ref: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <textarea
      ref={ref}
      className={cx(cstyles.inputbox, cstyles.margintopsmall)}
      rows={4}
      {...props}
    />
  )
}

export const Textarea = forwardRef(_Textarea)
