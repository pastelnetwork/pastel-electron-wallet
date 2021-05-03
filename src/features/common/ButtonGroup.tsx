import React from 'react'

import cstyles from './Common.module.css'

type Props = React.PropsWithChildren<unknown>

export function ButtonGroup(props: Props) {
  return <div className={cstyles.buttonGroup}>{props.children}</div>
}
