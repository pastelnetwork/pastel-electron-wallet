import cx from 'classnames'
import React from 'react'

import cstyles from './Common.module.css'

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      className={cx(cstyles.inputbox, cstyles.margintopsmall)}
      rows={4}
      {...props}
    />
  )
}
