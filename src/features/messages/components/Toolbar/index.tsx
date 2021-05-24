import './Toolbar.css'

import React from 'react'

interface ToolbarMessage {
  title: string
}

export default function Toolbar(props: ToolbarMessage): JSX.Element {
  const { title } = props
  return (
    <div className='toolbar'>
      <h1 className='toolbar-title'>{title}</h1>
    </div>
  )
}
