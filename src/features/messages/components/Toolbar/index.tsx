import React from 'react'

import * as Styles from './Toolbar.styles'

interface ToolbarMessage {
  title: string
}

export default function Toolbar(props: ToolbarMessage): JSX.Element {
  const { title } = props
  return (
    <Styles.Toolbar>
      <Styles.ToolbarTitle>{title}</Styles.ToolbarTitle>
    </Styles.Toolbar>
  )
}
