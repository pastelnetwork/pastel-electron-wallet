import './ToolbarButton.css'

import React from 'react'

interface IToolbarButton {
  icon: string
  onClick?: () => void
  isLoading?: boolean
}

export default function ToolbarIconButton({
  icon,
  onClick,
  isLoading,
}: IToolbarButton): JSX.Element {
  return (
    <>
      {isLoading ? (
        <button
          className='btn-wrapper__icon'
          onClick={onClick}
          disabled={isLoading}
        >
          <i className={`toolbar-button ${icon}`} />
        </button>
      ) : (
        <i onClick={onClick} className={`toolbar-button ${icon}`} />
      )}
    </>
  )
}
