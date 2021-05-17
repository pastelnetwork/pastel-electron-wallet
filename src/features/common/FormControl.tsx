import React from 'react'

import cstyles from './Common.module.css'

type Props = {
  title: string
  children: JSX.Element
}

export function FormControl(props: Props): JSX.Element {
  return (
    <div>
      <div className={cstyles.flexspacebetween}>
        <div className={cstyles.sublight}>{props.title}</div>
      </div>

      {props.children}
    </div>
  )
}
