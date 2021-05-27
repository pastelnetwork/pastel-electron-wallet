import React from 'react'

import * as Styles from './ToolbarButton.styles'

interface IToolbarButton {
  icon: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
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
        <Styles.BtnWrapperIcon onClick={onClick} disabled={isLoading}>
          <Styles.ToolbarButton className={`${icon}`} />
        </Styles.BtnWrapperIcon>
      ) : (
        <Styles.ToolbarButton onClick={onClick} className={`${icon}`} />
      )}
    </>
  )
}
