import cx from 'classnames'
import React from 'react'

import cstyles from './Common.module.css'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string
}

export function Button(props: Props): JSX.Element {
  return (
    <button className={cx(cstyles.primarybutton)} {...props}>
      {props.text}
    </button>
  )
}
